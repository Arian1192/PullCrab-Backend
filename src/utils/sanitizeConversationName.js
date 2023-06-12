const sanitizeConversationName = (name) => {
  // Convert to lowercase
  let sanitized = name.toLowerCase();
  // Replace spaces with underscores
  sanitized = sanitized.replace(/\s+/g, "_");
  // Remove invalid characters
  sanitized = sanitized.replace(/[^a-z0-9-_]/g, "");
  // Truncate to 80 characters
  sanitized = sanitized.substring(0, 80);
  return sanitized;
};

module.exports = { sanitizeConversationName };
