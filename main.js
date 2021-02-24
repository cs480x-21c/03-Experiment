// Width and height of SVG figures to render
const width = 500;
const height = 500;

// Creates an array of size 5-10 with data between 0-100
const getRandomData = () => {
    let a = new Array(d3.randomInt(5, 11)()).fill(undefined);

    return a.map(d => d3.randomInt(0, 101)());
}

// Returns a list of two random indexes from the given random data
const randomSelection = (randomData) => {
    let i1, i2;
    do {
        i1 = d3.randomInt(0, randomData.length)();
        i2 = d3.randomInt(0, randomData.length)();
    } while (i1 === i2);
    return [i1, i2];
}

/*  PUT CODE HERE */
function main() {
    const elements = d3.selectAll(".viz");

    const svg1 = d3.create("svg")
        .attr("width", width)
        .attr("height", height)
        .style("background", "blue");

    // SVG 2
    let svg2InitialData = getRandomData();
    let svg2SelectedData = randomSelection(svg2InitialData);

    // Manipulate data to work with d3.stratify()
    let svg2Data = [{"name": "root", "parent": null, "value": null}];
    let id = 0;
    svg2InitialData.forEach(val => {
        svg2Data.push({"name": id++, "parent": "root", "value": val});
    });

    // Transform data to be used in tree map
    let root = d3.stratify()
        .id(d => d.name)   // Name of the entity (column name is name in csv)
        .parentId(d => d.parent)   // Name of the parent (column name is parent in csv)
        (svg2Data);

    // Sum values to determine root leaf size
    root.sum(d => d.value)

    // Calculate tree map leaves
    d3.treemap()
        .size([width, height])
        .padding(4)
        (root);

    // Create tree map SVG
    const svg2 = d3.create("svg")
        .attr("viewBox", [-width / 2, -height / 2, width, height]);

    // Add rectangles to tree map
    svg2.selectAll("rect")
        .data(root.leaves())
        .enter()
        .append("rect")
        .attr('x', d => d.x0 - (width / 2))
        .attr('y', d => d.y0 - (width / 2))
        .attr('width', d => d.x1 - d.x0)
        .attr('height', d => d.y1 - d.y0)
        .style("stroke", "black")
        .style("fill", "none");

    // Add dot indicators to tree map
    svg2.selectAll("circle")
        .data(root.leaves())
        .enter()
        .append("circle")
        .attr("cx", d => (d.x1 + d.x0) / 2 - 250)
        .attr("cy", d => (d.y1 + d.y0) / 2 - 250)
        .attr("r", 3)
        .style("fill", d => (d.id === "" + svg2SelectedData[0] || d.id === "" + svg2SelectedData[1]) ? "black" : "none");

    // SVG 3
    const svg3Data = getRandomData();
    const svg3SelectedData = randomSelection(svg3Data);
    const arcs = d3.pie()(getRandomData());
    const arc = d3.arc()
        .innerRadius(0)
        .outerRadius(Math.min(width, height) / 2 - 1);
    const arcLabel = () => {
        const radius = Math.min(width, height) / 2 * 0.8;
        return d3.arc().innerRadius(radius).outerRadius(radius);
    }
    const svg3 = d3.create("svg")
        .attr("viewBox", [-width / 2, -height / 2, width, height]);

    svg3.append("g")
        .attr("stroke", "black")
        .selectAll("path")
        .data(arcs)
        .join("path")
        .attr("fill", "none")
        .attr("d", arc);
    svg3.append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 12)
        .attr("text-anchor", "middle")
        .selectAll("text")
        .data(arcs)
        .join("g")
        .attr("transform", d => `translate(${(arcLabel()).centroid(d)})`)
        .call(text => text.append("circle")
            .attr("fill",
                d => (d.index === svg3SelectedData[0] || d.index === svg3SelectedData[1]) ? "black" : "none")
            .attr("r", 3)
            .attr("width", 6)
            .attr("height", 6));


    /* ^ PUT CODE HERE ^ */

    d3.select("#viz1")
        .append(() => svg1.node());
    d3.select("#viz2")
        .insert(() => svg2.node());
    d3.select("#viz3")
        .insert(() => svg3.node());

    let previousRandom = Math.round(Math.random() * (elements.size() - 1));
    const randomsSelected = [previousRandom];


    const nextRandom = () => {
        if (randomsSelected.length < elements.size()) {
            let r = Math.round(Math.random() * (elements.size() - 1));
            while (randomsSelected.indexOf(r) > -1) {
                r = Math.round(Math.random() * (elements.size() - 1));
            }
            previousRandom = r;
            randomsSelected.push(r);
            return r;
        }
    };

    elements
        .style("transform", (d, i) => {
            return i === previousRandom ? "translate(0)" : "translateX(100vw)";
        })
        .style("position", "absolute")
        .style("transition", "ease-in-out transform 0.7s")
        .select("input")
        .attr("tabindex", (d, i) => {
            return i === previousRandom ? "" : "-1";
        });

    elements.select("button")
        .attr("tabindex", (d, i) => {
            return i === previousRandom ? "" : "-1";
        });

    d3.select("#complete")
        .select("a")
        .attr("tabindex", "-1");


    let orderCount = 1;
    let output = [];

    elements.selectAll("form").on("submit", function (e) {
        if (!e.target[0].value || isNaN(+e.target[0].value)) {
            e.preventDefault();
            return
        }

        output.push({
            trialNumber: orderCount,
            reportedPercent: e.target[0].value,
            vis: e.target[0].id,
            expected: 75
        });
        console.log(e);
        console.log(output);
        orderCount++;

        e.target[0].blur();
        e.target[1].blur();
        e.target[0].tabIndex = -1;
        e.target[1].tabIndex = -1;

        if (randomsSelected.length < elements.size()) {
            elements
                .filter(function (d, i) {
                    return i === previousRandom;
                })
                .style("transform", "translateX(-100vw)");

            let nextr = nextRandom();

            let form = elements
                .filter(function (d, i) {
                    return i === nextr;
                })
                .style("transform", "translateX(0)");

            form.select("input")
                .attr("tabindex", "");

            form.select("button")
                .attr("tabindex", "");

        } else {

            elements
                .filter(function (d, i) {
                    return i === previousRandom;
                })
                .style("transform", "translateX(-100vw)");

            let complete = d3.select("#complete")
                .style("transition", "ease-in-out transform 0.7s")
                .style("transform", "translateX(0)")

            complete.append("p")
                .text("Your results have been recorded");

            complete.select("a")
                .attr("tabindex", "");

            // Load browser fingerprinting library
            FingerprintJS.load().then(fp => {
                fp.get().then(result => {
                    // Create a root reference
                    let storageRef = firebase.storage().ref();

                    // Create reference to JSON file in firebase
                    let ref = storageRef.child("public/" + result.visitorId + ".json");

                    ref.putString(JSON.stringify(output)).then((snapshot) => {
                        console.log("Uploaded to firebase");
                    });
                });
            });
        }

        e.preventDefault();
    });
}