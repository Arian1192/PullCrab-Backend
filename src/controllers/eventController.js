const { SlackApp } = require("../utils/initSlackApp");
const { noReviewers } = require("../utils/slackViews");
const {
  sanitizeConversationName,
} = require("../utils/sanitizeConversationName");

const eventGitHubController = async (req, res) => {
  console.log("entra en el controlador");
  console.log(req);
  const slackClient = await SlackApp.client;
  const body = await req.body;


  if (body) {
    const { action, pull_request } = body;

    if (action) {
      console.log(pull_request.head.ref);
      const sanitazedName = sanitizeConversationName(pull_request.head.ref);
      switch (action) {
        case "opened":
          if (pull_request.requested_reviewers.length === 0) {
            const slackUser = await slackClient.users.lookupByEmail({
              email: "arianlearning@gmail.com",
            });
            // Saneamos el nombre de la rama para que no de problemas al crear el nuevo canal.
            const newChannel = await slackClient.conversations.create({
              name: sanitazedName,
            });
            await slackClient.conversations.invite({
              channel: newChannel.channel.id,
              users: slackUser.user.id,
            });
            // await slackClient.chat.postMessage({
            //   channel: newChannel.channel.id,
            //   text: `Te recomiendo, que unas a los demas miembros de la squad para que puedan revisar contigo la PR ${pull_request.html_url}`,
            // });
            await slackClient.chat.postMessage({
              channel: newChannel.channel.id,
              text: "Información de la PR",
              blocks: [noReviewers(pull_request.html_url)],
            });
          } else {
            if (pull_request.requested_reviewers.length > 0) {
              const slackUser = await slackClient.users.lookupByEmail({
                email: "arianlearning@gmail.com",
              });
              await slackClient.conversations.create({
                name: sanitazedName,
              });
              await slackClient.conversations.invite({
                channel: newChannel.channel.id,
                users: slackUser.user.id,
              });
            }
          }
          break;
        default:
          console.log("no se que evento se ha generado");
          break;
      }
    }
    return res.status(200).json({ message: "ok" });
  } else {
    console.log("esta llegando undefined");
    return res.status(200).json({ message: "ok" });
  }
};

module.exports = { eventGitHubController };
//TODO: Comprobar el evento que llega de github y hacer un switch con un useCase por cada uno de ellos.
//TODO: Comparar si el evento que llega es una PR y tiene reviewers asignados, si es así, enviar un mensaje de slack a casa uno de los reviewers, añadirlos al canal
//      creado para la resolución de la PR y enviar por si acaso un link al canal de slack para que puedan acceder a el desde el mensaje de slack.
//TODO: Si el evento que nos llega es la creacion de una nueva rama, enviar un mensaje a slack canal general con el nombre de la rama y el nombre del usuario que la ha creado.
//TODO: Una vez se cierra la PR, enviar un mensaje al canal de slack con el nombre de la rama dando un plazo de 1 semana para que se pueda revertir la rama y avisar de que el canal
//      se va a eliminar en 1 semana.
//TODO: Dar la posibilidad de ampliar una semana mas el plazo de eliminación del canal.
//TODO: Si en una PR se añade un comentario, enviar un mensaje al canal de slack con el nombre de la rama y el nombre del usuario que ha hecho el comentario. ademas del comentario
