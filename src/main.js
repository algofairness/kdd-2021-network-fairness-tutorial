function setupReferences(sel)
{
    sel.append("a").attr("href", (d, i) => `#${String(i+1)}`).text((d, i) => `[${String(i+1)}] `);
    
    let articles = sel.filter(d => d.entryType === 'article');
    articles.append("span").text(d => `${d.entryTags.author}. `);
    articles.append("span").append("em").text(d => `${d.entryTags.title}. `);
    articles.append("span").text(d => `${d.entryTags.journal}. `);
    articles.filter(d => d.entryTags.volume !== undefined).append("span").text(d => d.entryTags.volume);
    articles.filter(d => d.entryTags.number !== undefined).append("span").text(d => `:${d.entryTags.number}`);
    articles.filter(d => d.entryTags.pages !== undefined).append("span").text(d => ` (${d.entryTags.pages})`);
    articles.filter(d => (d.entryTags.volume !== undefined ||
                          d.entryTags.number !== undefined ||
                          d.entryTags.pages !== undefined)). append("span").text(". ");
    articles.filter(d => d.entryTags.publisher !== undefined).append("span").text(d => `${d.entryTags.pages}, `);
    articles.append("span").text(d => `${d.entryTags.year}.`);

    let confprocs = sel.filter(d => d.entryType === 'inproceedings');

    confprocs.append("span").text(d => `${d.entryTags.author}. `);
    confprocs.append("span").append("em").text(d => `${d.entryTags.title}. `);
    confprocs.append("span").text(d => `${d.entryTags.booktitle}. `);
    confprocs.filter(d => d.entryTags.pages !== undefined).append("span").text(d => ` ${d.entryTags.pages}.`);
    confprocs.append("span").text(d => `${d.entryTags.year}.`);
    
    // sel.text(d => d.citationKey);
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
