module.exports = {
    format_date: (date) => {
      // Format date as MM/DD/YYYY
      return date.toLocaleDateString();
    },
    check_equality: (id, user, options) => {
      return (id == user) ? options.fn(this) : options.inverse(this);
    }
    
};
  