const noReviewers = (url) => {
  return {
    type: "section",
    text: {
      type: "mrkdwn",
      text: `La PR no tiene reviewers asignados, te recomiendo que añadas a los demas miembros de la squad para que puedan revisar contigo la PR ${url}`,
    },
  };
};

module.exports = {
  noReviewers,
};
