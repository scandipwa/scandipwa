/**
 * Generate custom response
 * @param body
 * @param status
 * @param statusText
 * @returns {Promise<any>}
 */
const generateCustomResponse = (body, status = 200, statusText = 'OK') => new Response(body, { status, statusText });

export default generateCustomResponse;
