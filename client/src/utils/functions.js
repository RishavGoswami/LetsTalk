export const capitalization = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const getDate = () => {
  let newDate = new Date().toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
  return newDate;
};

export const getTime = () =>
  new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

export const getInitials = name => {
  var initials = name.match(/\b\w/g) || [];
  return (initials = (
    (initials.shift() || "") + (initials.pop() || "")
  ).toUpperCase());
};
