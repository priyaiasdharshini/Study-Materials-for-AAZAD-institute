document.addEventListener("DOMContentLoaded", function () {
    var MQ = MathQuill.getInterface(2);
    var mathField = MQ.MathField(document.getElementById("math-field"), {
        spaceBehavesLikeTab: true,
        handlers: {
            edit: function () {
                document.getElementById("formulaInput").value = mathField.latex();
            }
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    var MQ = MathQuill.getInterface(2);
    var mathField = MQ.MathField(document.getElementById("math-field"), {
        spaceBehavesLikeTab: true,
        handlers: {
            edit: function () {
                document.getElementById("formulaInput").value = mathField.latex();
            }
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const coursesDropdown = document.getElementById("courses");
    const subjectsDropdown = document.getElementById("subject");
    const unitsDropdown = document.getElementById("unit");
    const topicsDropdown = document.getElementById("topics");
    const unitInput = document.getElementById("unitInput");
    const topicInput = document.getElementById("topicInput");

    // Subjects based on Course selection
    const subjectsData = {
        "NEET": ["Physics", "Chemistry", "Biology"],
        "JEE": ["Mathematics", "Physics", "Chemistry"],
        "CLAT": ["Logical Reasoning", "English", "Legal Aptitude"],
        "CUET": ["Maths", "Science", "General Studies"],
        "Foundation": ["Science", "Mathematics", "English"],
        "Olympiad": ["Mathematics", "Science", "Computer Science"],
        "Classes": ["Class 10", "Class 11", "Class 12"]
    };

    // Units based on Subject selection
    const unitsData = {
        "Physics": ["Kinematics", "Dynamics", "Thermodynamics", "Electromagnetism"],
        "Chemistry": ["Organic Chemistry", "Inorganic Chemistry", "Physical Chemistry"],
        "Biology": ["Genetics", "Human Physiology", "Ecology"]
    };

    // Topics based on Unit selection
    const topicsData = {
        "Kinematics": ["Motion in 1D", "Projectile Motion", "Relative Motion"],
        "Dynamics": ["Newton's Laws", "Friction", "Work and Energy"],
        "Organic Chemistry": ["Hydrocarbons", "Alcohols and Phenols", "Polymers"]
    };

    // Update Subjects when Course changes
    coursesDropdown.addEventListener("change", function () {
        updateDropdown(subjectsDropdown, subjectsData[this.value]);
    });

    // Update Units when Subject changes
    subjectsDropdown.addEventListener("change", function () {
        updateDropdown(unitsDropdown, unitsData[this.value]);
    });

    // Update Topics when Unit changes
    unitsDropdown.addEventListener("change", function () {
        updateDropdown(topicsDropdown, topicsData[this.value]);
    });

    // Allow manual Unit input
    unitInput.addEventListener("input", function () {
        addCustomOption(unitsDropdown, this.value.trim());
    });

    // Allow manual Topic input
    topicInput.addEventListener("input", function () {
        addCustomOption(topicsDropdown, this.value.trim());
    });

    // Utility function to update dropdown options
    function updateDropdown(dropdown, dataArray) {
        dropdown.innerHTML = `<option value="" disabled selected>Select an option</option>`;
        if (dataArray) {
            dataArray.forEach(item => {
                let option = document.createElement("option");
                option.value = item;
                option.textContent = item;
                dropdown.appendChild(option);
            });
        }
    }

    // Utility function to add a custom input as an option
    function addCustomOption(dropdown, value) {
        if (!value) return;
        let existingOption = Array.from(dropdown.options).find(option => option.value === value);
        if (!existingOption) {
            let newOption = document.createElement("option");
            newOption.value = value;
            newOption.textContent = value;
            newOption.selected = true;
            dropdown.appendChild(newOption);
        }
    }

    // Function to add a new reference link field
    function addLinkField() {
        const linksContainer = document.getElementById("links-container");
        let input = document.createElement("input");
        input.type = "url";
        input.placeholder = "Enter link";
        input.classList.add("w-full", "p-2", "border", "rounded-md", "mb-2");
        linksContainer.appendChild(input);
    }
    document.querySelector("button[onclick='addLinkField()']").addEventListener("click", addLinkField);

    // Function to add a new table
    function addTable() {
        const tablesContainer = document.getElementById("tables-container");
        let table = document.createElement("table");
        table.classList.add("w-full", "border", "border-gray-300", "mt-2");
        table.innerHTML = `
            <tr>
                <th class="border p-2">Column 1</th>
                <th class="border p-2">Column 2</th>
            </tr>
            <tr>
                <td class="border p-2"><input type="text" placeholder="Enter data"></td>
                <td class="border p-2"><input type="text" placeholder="Enter data"></td>
            </tr>
        `;
        tablesContainer.appendChild(table);
    }
    document.querySelector("button[onclick='addTable()']").addEventListener("click", addTable);

    // Function to handle form submission
    document.getElementById("content-form").addEventListener("submit", function (event) {
        event.preventDefault();
        const outputContainer = document.getElementById("output-container");
        const publishedContent = document.getElementById("published-content");

        let uploadedImage = this.image.files[0] ? URL.createObjectURL(this.image.files[0]) : "";
        let uploadedVideo = this.video.files[0] ? URL.createObjectURL(this.video.files[0]) : "";
        let uploadedPdf = this.pdf.files[0] ? URL.createObjectURL(this.pdf.files[0]) : "";

        let contentHTML = `
            <p><strong>Course:</strong> ${coursesDropdown.value}</p>
            <p><strong>Subject:</strong> ${subjectsDropdown.value}</p>
            <p><strong>Unit:</strong> ${unitsDropdown.value}</p>
            <p><strong>Topic:</strong> ${topicsDropdown.value}</p>
            <p><strong>Heading:</strong> ${this.heading.value}</p>
            <p><strong>Description:</strong> ${this.description.value}</p>
            <p><strong>Tags:</strong> ${this.tags.value}</p>
        `;

        if (uploadedImage) {
            contentHTML += `<p><strong>Image:</strong><br><img src="${uploadedImage}" class="w-32 h-auto"></p>`;
        }
        if (uploadedVideo) {
            contentHTML += `<p><strong>Video:</strong><br><video src="${uploadedVideo}" controls class="w-64 h-auto"></video></p>`;
        }
        if (uploadedPdf) {
            contentHTML += `<p><strong>PDF:</strong><br><a href="${uploadedPdf}" target="_blank" class="text-blue-500">View PDF</a></p>`;
        }

        // Collect reference links
        let links = Array.from(document.querySelectorAll("#links-container input[type='url']"))
            .map(input => input.value)
            .filter(link => link.trim() !== "");
        if (links.length > 0) {
            contentHTML += `<p><strong>Reference Links:</strong><br>${links.map(link => `<a href="${link}" target="_blank" class="text-blue-500">${link}</a>`).join("<br>")}</p>`;
        }

        publishedContent.innerHTML = contentHTML;
        outputContainer.classList.remove("hidden");

        alert("Content Published Successfully!");
    });
});


// Store the content before submitting
document.getElementById("content-form").addEventListener("submit", function () {
    document.getElementById("hidden-description").value = quill.root.innerHTML;
});

document.getElementById("generateQr").addEventListener("click", function() {
    let qrText = document.getElementById("qrCodeInput").value;
    let qrCodeDisplay = document.getElementById("qrCodeDisplay");
    qrCodeDisplay.innerHTML = "";
    if (qrText.trim() !== "") {
        new QRCode(qrCodeDisplay, {
            text: qrText,
            width: 128,
            height: 128
        });
    }
});

var quill = new Quill('#editor', {
    theme: 'snow'
});

document.getElementById("uploadForm").addEventListener("submit", function(event) {
    document.getElementById("description").value = quill.root.innerHTML;
});
