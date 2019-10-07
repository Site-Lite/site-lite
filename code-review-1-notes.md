# Notes for Code Review 1

## Schema Design

- Understand the tradeoffs between document (NoSQL) stores and a traditional SQL DB
- Be able to defend your architectural decisions in terms of how you're saving your data

## Some Design Points We Discussed

- How would you implement an undo feature??
- How would implement a redo feature?

## Interesting Features

- One predefined template
- Stretch Goal: Drag and Drop
- Predefined components

## Questions to Ponder

- Are inline styles the best way to go?
- How can use the CSS-in-JS style to load your styles?
    - See: [Styled Components](https://www.styled-components.com/)
- How will you be able to save styles in general?
- How does data flow from frontend to backend in terms of how you are saving user templates?
- Would you need something like local storage?