window.addEventListener('DOMContentLoaded', (event) => {
    let refsEl = d3.selectAll("#refs").node();
    let bibtexEntries = bibtexParse.toJSON(refs.innerText);
    let header = refsEl.previousElementSibling;

    d3.select("#refslist").append("ul")
        .selectAll("li")
        .data(bibtexEntries)
        .enter()
        .append("li")
        .text(d => d.citationKey);
});
