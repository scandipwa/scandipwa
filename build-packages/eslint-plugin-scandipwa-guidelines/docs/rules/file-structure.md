# File structure must comply to the strict guidelines of ScandiPWA (file-structure)

File structure must comply to the following guidelines:
- File structure must be flat, meaning that nesting components inside of other components is prohibited.
- Extending root directory src with custom folders is prohibited.
- File structure regulations imply having files with certain postfixes for certain functionality parts.

Allowed postfixes are as follows
- Component and route: .component .container .style
- Store: .action .dispatcher .reducer
- Query: .query
- Style, type: none

For files which are in their own directories with functionality related only to them (e.g routes, components), names should match the name of the directory these files are in.
