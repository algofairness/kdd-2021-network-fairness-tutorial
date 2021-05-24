/*global bibtexParse*/

function setupReferences(sel)
{
    sel.append("a").attr("id", (d, i) => `${String(i+1)}`);
    sel.append("span").text((d, i) => `[${String(i+1)}]`);
    
    let articles = sel.filter(d => d.entryType === 'article');
    articles.append("span").text(d => ` ${d.entryTags.author}. `);
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

    confprocs.append("span").text(d => ` ${d.entryTags.author}. `);
    confprocs.append("span").append("em").text(d => `${d.entryTags.title}. `);
    confprocs.append("span").text(d => `${d.entryTags.booktitle}. `);
    confprocs.filter(d => d.entryTags.pages !== undefined).append("span").text(d => ` ${d.entryTags.pages}.`);
    confprocs.append("span").text(d => `${d.entryTags.year}.`);
}

window.addEventListener('DOMContentLoaded', (event) => {
    let refsEl = d3.selectAll("#refs").node();
    let bibtexEntries = bibtexParse.toJSON(refsEl.innerText);
    let bibtexKeys = bibtexEntries.map(e => e.citationKey);
    let header = refsEl.previousElementSibling;

    // create references section
    d3.select("#refs").remove();
    d3.select("#refslist").append("ul")
        .selectAll("li")
        .data(bibtexEntries)
        .enter()
        .append("li")
        .call(setupReferences);

    // replace references in text
    let citepR = /\\citep{([^}]+)}/g;
    document.querySelectorAll("p")
        .forEach(p => {
            let replacement = p.innerHTML.replaceAll(citepR, (m, p, off, s) => 
                p.split(',')
                    .map(s => {
                        s = s.trim();
                        let index = bibtexKeys.indexOf(s);
                        let v = String(index + 1);
                        return `<a href="#${v}">[${v}]</a>`;
                    }).join(" "));
            p.innerHTML = replacement;
        });

    function authorName(e) {
        let authorNames = e.entryTags.author.split(" and ");
        let authorSurnames = authorNames.map(s => s.split(", ")[0]);
        if (authorSurnames.length > 2) {
            return `${authorSurnames[0]} et al.`;
        } else if (authorSurnames.length === 2) {
            return `${authorSurnames[0]} and ${authorSurnames[1]}`;
        } else {
            return authorSurnames[0];
        }
    }
    
    let citeR = /\\cite{([^}]+)}/g;
    document.querySelectorAll("p")
        .forEach(p => {
            let replacement = p.innerHTML.replaceAll(citeR, (m, p, off, s) => {
                p = p.trim();
                let index = bibtexKeys.indexOf(p);
                let v = String(index + 1);
                return `<a href="#${v}">${authorName(bibtexEntries[index])}</a>`;
            });
            p.innerHTML = replacement;
        });

});
