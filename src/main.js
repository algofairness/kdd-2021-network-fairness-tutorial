function setupReferences(sel)
{
    sel.text(d => d.citationKey);
}

window.addEventListener('DOMContentLoaded', (event) => {
    let refsEl = d3.selectAll("#refs").node();
    let bibtexEntries = bibtexParse.toJSON(refs.innerText);
    let header = refsEl.previousElementSibling;

    console.log(bibtexEntries);
    
    d3.select("#refs").remove();
    d3.select("#refslist").append("ul")
        .selectAll("li")
        .data(bibtexEntries)
        .enter()
        .append("li")
        .call(setupReferences);
});
