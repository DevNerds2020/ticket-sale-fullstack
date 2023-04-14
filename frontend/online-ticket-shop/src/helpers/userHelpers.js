/**
 * @function checkUserPermissionToBuyTicket
 * @param {*} user
 * @param {*} ticket
 * @description check if the user has permission to buy the ticket
 */
export const checkUserPermissionToBuyTicket = (user, ticket) => {
    console.log('%c Line:2 🌭 ticket', 'color:#f5ce50', ticket);
    console.log('%c Line:2 🥒 user', 'color:#ffdd4d', user);
    // ...
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
