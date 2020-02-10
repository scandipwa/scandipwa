// import { Page } from 'Component/Page';

// class PagePlugin {
//     static changeListItemCount(args) {
//         const [ originalNumber ] = args;
//         const newNumber = originalNumber + 10;
//         return [ newNumber ]; // modified args
//     }
// }

// export const config = {
//     ['Core/Page']: {
//         [Page.prototype.getListItems.name]: {
//             before: [
//                 PagePlugin.changeListItemCount
//             ]
//         }
//     }
// }

window.plugins = 'Hello, I am here!';
console.log('Gote');