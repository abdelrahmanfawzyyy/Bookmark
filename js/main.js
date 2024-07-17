let getName = document.getElementById('siteName');
let getUrl = document.getElementById('siteUrl');

let sites = [];

if (localStorage.getItem('allSites')) {
    sites = JSON.parse(localStorage.getItem('allSites'));
    display();
}

function addSites() {
    if (validate()) {
        let site = {
            name: getName.value,
            url: getUrl.value
        };
        sites.push(site);
        localStorage.setItem('allSites', JSON.stringify(sites));
        display();
    } else {
        alert("Please enter a valid URL and a name with more than 2 characters.");
    }
    getName.value = ''
    getUrl.value = ''
}

function display() {
    let show = ``;
    for (let i = 0; i < sites.length; i++) {
        show += `<tr>
                    <th>${i + 1}</th>
                    <td>${sites[i].name}</td>
                    <td><a href="${sites[i].url}" target="_blank"><button class="btn btn-success px-2"> <i class="fa-regular fa-eye pe-2"></i>Visit</button></a></td>
                    <td><button onclick='deleteItems(${i})' class="btn btn-danger px-2'><i class="fa-solid pe-2 fa-trash"></i>Delete</button></td>
                </tr>`;
    }
    document.getElementById('demo').innerHTML = show;
}

function deleteItems(index) {
    sites.splice(index, 1);
    localStorage.setItem('allSites', JSON.stringify(sites));
    display();
}

function validate() {
    let urlRe = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
    let nameValid = getName.value.length > 2;
    let urlValid = urlRe.test(getUrl.value);

    console.log("Name validation:", nameValid);
    console.log("URL validation:", urlValid);

    return nameValid && urlValid;
}