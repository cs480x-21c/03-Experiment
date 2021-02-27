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

// initMaterialComponents() sets up the material components
function initMaterialComponents() {
    //mdc.ripple.MDCRipple.attachTo(document.querySelector(".mdc-button"));
    document.querySelectorAll(".mdc-button").forEach(element =>
    mdc.ripple.MDCRipple.attachTo(element))
    document.querySelectorAll(".mdc-text-field").forEach(element =>
        mdc.textField.MDCTextField.attachTo(element))
}

/*  PUT CODE HERE */
function main() {
    initMaterialComponents();

    const elements = d3.selectAll(".viz");

    // SVG 1
    const svg1InitialData = getRandomData();
    const svg1SelectedData = randomSelection(svg1InitialData);

    // Sum of all svg 1 values
    const svg1Sum = svg1InitialData.reduce((sum, curr) => sum += curr);

    // sorts the values of the array so that they are in ascending order
    svg1InitialData.sort((a, b) => d3.ascending(a, b));

    // creates the color scale
    const colorScale = d3.scaleLinear()
        .domain([0, d3.max(svg1InitialData, d => d)])
        .range([0, 1])

    // gets the sum of the number of pixels of all previous entries
    // using the scaled values
    function getSum(index) {
        let sum = 0;
        for (let i = 0; i < index; i++) {
            sum += (svg1InitialData[i] / svg1Sum * width);
        }
        return sum;
    }

    const svg1 = d3.create("svg")
        .attr("viewBox", [-width / 2, -height / 2, width, height]);

    svg1.selectAll("rect")
        .data(svg1InitialData)
        .enter()
        .append("rect")
        .attr("x", (d, i) => getSum(i) - (width / 2))
        .attr("y", d => 0)
        .attr("width", d => Math.max(d / svg1Sum * width - 2, 0.0))
        .attr("height", d => height / 20)
        .style("fill", d => d3.color("lightgrey").darker(colorScale(d)));

    svg1.selectAll("circle")
        .data(svg1InitialData)
        .enter()
        .append("circle")
        .attr("cx", (d, i) => (getSum(i) - (width / 2)) + ((d / svg1Sum * width - 2)) / 2)
        .attr("cy", d => height / 40)
        .attr("r", 3)
        .style("fill", (d, i) => (i === svg1SelectedData[0] || i === svg1SelectedData[1]) ? "black" : "none");

    // SVG 2
    let svg2InitialData = getRandomData();
    const svg2SelectedData = randomSelection(svg2InitialData);

    // Manipulate data to work with d3.stratify()
    let svg2Data = [{ "name": "root", "parent": null, "value": null }];
    let id = 0;
    svg2InitialData.forEach(val => {
        svg2Data.push({ "name": id++, "parent": "root", "value": val });
    });

    // Transform data to be used in tree map
    let root = d3.stratify()
        .id(d => d.name) // Name of the entity (column name is name in csv)
        .parentId(d => d.parent) // Name of the parent (column name is parent in csv)
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
        .attr("x", d => d.x0 - (width / 2))
        .attr("y", d => d.y0 - (width / 2))
        .attr("width", d => d.x1 - d.x0)
        .attr("height", d => d.y1 - d.y0)
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
    const arcs = d3.pie()(svg3Data);
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

    elements.selectAll("form").on("submit", function(e) {
        if (!e.target[0].value || isNaN(+e.target[0].value)) {
            e.preventDefault();
            return
        }

        let truePerc = (v1, v2) => {
            return Math.round((v1 > v2 ? v2 / v1 : v1 / v2) * 100) | 0;
        }


        switch (e.target[0].id) {
            case "viz1":

                truePerc = truePerc(
                    svg1InitialData[svg1SelectedData[0]],
                    svg1InitialData[svg1SelectedData[1]]
                );
                break;
            case "viz2":

                truePerc = truePerc(
                    svg2InitialData[svg2SelectedData[0]],
                    svg2InitialData[svg2SelectedData[1]]
                );
                break;
            case "viz3":

                truePerc = truePerc(
                    svg3Data[svg3SelectedData[0]],
                    svg3Data[svg3SelectedData[1]]
                );
                break;
            default:
                truePerc = 1
                break;
        }

        let reported = +e.target[0].value;
        let err = reported === truePerc ?
            0 : Math.log2(Math.abs((+e.target[0].value) - truePerc) + (1 / 8));

        output.push({
            trialNumber: orderCount,
            reportedPercent: reported,
            vis: e.target[0].id,
            expected: truePerc,
            error: err
        });

        orderCount++;

        e.target[0].blur();
        e.target[0].tabIndex = -1;

        if (randomsSelected.length < elements.size()) {
            elements
                .filter(function(d, i) {
                    return i === previousRandom;
                })
                .style("transform", "translateX(-100vw)");

            let nextr = nextRandom();

            let form = elements
                .filter(function(d, i) {
                    return i === nextr;
                })
                .style("transform", "translateX(0)");

            form.select("input")
                .attr("tabindex", "");

            form.select("button")
                .attr("tabindex", "");

        } else {

            elements
                .filter(function(d, i) {
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
                    let db = firebase.firestore();
                    var time = Date.now().toString();

                    db.collection(result.visitorId).doc(time).set({ output })
                        .then(() => {
                            console.log("Document successfully written!");
                        })
                        .catch((error) => {
                            console.error("Error writing document: ", error);
                        });



                });
            });
        }

        e.preventDefault();
    });
}