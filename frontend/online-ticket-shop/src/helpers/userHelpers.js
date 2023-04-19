/**
 * @function checkUserPermissionToBuyTicket
 * @param {*} user
 * @description check if the user has permission to buy the ticket if user gender birthdate passportId nationalId zip state city address is not empty
 */
export const checkUserPermissionToBuyTicket = (user) => {
    if (
        user.gender &&
        user.passportId &&
        user.nationalId &&
        user.zip &&
        user.state &&
        user.city &&
        user.address
    ) {
        return true;
    } else {
        return false;
    }
};

/**
 * @function checkUserPermissionToEditTicket
 * @param {*} user
 * @param {*} ticket
 * @description check if the user has permission to edit the ticket
 */
export const checkUserPermissionToEditTicket = (user, ticket) => {
    console.log('%c Line:6 🍌 ticket', 'color:#fca650', ticket);
    console.log('%c Line:6 🍤 user', 'color:#ed9ec7', user);
    // ...
};

/**
 *@function getUserShoppingBagCount
 * @param {*} user
 * @description check if the user has permission to edit the ticket
 */
export const getUserShoppingBagCount = (user) => {
    //based on the user itemsBag array and the quantity of each item, return the total number of items in the bag
    let count = 0;
    user.itemsBag.forEach((item) => {
        count += item.quantity;
    });
    return count;
};

/**
 * @function checkPermissionToRemoveTicketFromShoppingBag
 * @param {*} ticket
 * @description check if the user has permission to remove the ticket from the shopping bag based on the days left to the departure date
 * @returns {boolean}
 */
export const checkPermissionToRemoveTicketFromShoppingBag = (ticket) => {
    const today = new Date();
    const departureDate = new Date(ticket.departureDate);
    const daysLeft = Math.ceil((departureDate - today) / (1000 * 60 * 60 * 24));
    if (daysLeft > 7) {
        return true;
    }
    return false;
};
