/**
 * @function checkUserPermissionToBuyTicket
 * @param {*} user
 * @description check if the user has permission to buy the ticket if user gender birthdate passportId nationalId zip state city address is not empty
 */
export const checkUserPermissionToBuyTicket = (user) => {
    if (
        user.gender &&
        user.passport_id &&
        user.national_id &&
        isIranianNationalIdValid(user.national_id) &&
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
 * TODO if needed
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

/**
 * @function isIranianNationalIdValid
 * @param {number} nationalId
 * @returns {boolean}
 * @description check if the nationalId is valid
 */
export function isIranianNationalIdValid(nationalId) {
    // Check if the national ID is 10 digits long
    if (nationalId.length !== 10) {
        return false;
    }

    // Check if all characters are digits
    if (!/^\d+$/.test(nationalId)) {
        return false;
    }

    // Validate the check digit
    var checkDigit = parseInt(nationalId[9]);
    var sum = 0;

    for (var i = 0; i < 9; i++) {
        sum += parseInt(nationalId[i]) * (10 - i);
    }

    var remainder = sum % 11;

    // Handle special cases for check digit
    if (remainder < 2 && checkDigit === remainder) {
        return true;
    } else if (remainder >= 2 && checkDigit === 11 - remainder) {
        return true;
    }

    return false;
}
