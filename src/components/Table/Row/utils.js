/**
 * Converts a link of form /route/:param/route to
 * /route/value/route replacing the :param value with the
 * actual property in row
 * @param {string} linkTo
 * @param {Object} row
 */
export const getFinalLink = (linkTo, row) => {
  if (!linkTo) {
    return '';
  }
  let finalLink = linkTo;

  const params = linkTo.split(':');

  params.forEach((param) => {
    // Get the slashindex
    const slashIndex = param.indexOf('/');
    const paramToExtract =
      slashIndex > -1
        ? param.substr(0, slashIndex) // Its a param, remove everything after the slash
        : param; // It might be the final param, just return it
    if (paramToExtract) {
      // Replace the param with the current value in row :)
      finalLink = finalLink.replace(`:${paramToExtract}`, row[paramToExtract]);
    }
  });

  return finalLink;
};

export default {
  getFinalLink,
};
