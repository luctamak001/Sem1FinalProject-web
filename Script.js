const SUPERBASE_URL = `https://infkobjgpzpmiurstpxl.supabase.co`;
const SUPERBASE_KEY = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImluZmtvYmpncHpwbWl1cnN0cHhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc2MTYxOTEsImV4cCI6MjA5MzE5MjE5MX0.tPPKIvPjV2XhgO-YMJQnFoTN2kFpRPJDRXPizSaap0o`;
const db = window.supabase.createClient(SUPERBASE_URL, SUPERBASE_KEY);

function handleReadMoreClick() {
        document.getElementById("myDropdown").classList.toggle("show");
    }

    /* 2. This closes the menu if you click anywhere else on the screen */
    window.onclick = function (event) {
        // Check if the user clicked something OTHER than the button
        if (!event.target.matches('.dropbtn')) {
            const dropdown = document.getElementById("myDropdown");

            // If the menu is open, close it
            if (dropdown.classList.contains('show')) {
                dropdown.classList.remove('show');
            }
        }
    }

                        // ============SUPABASE==============



async function fetchUserLink(userId) {
    // 1. Still performing the Supabase check
    const { data, error } = await db
        .from('dropdown_links')
        .select('url_link')
        .eq('user_id', userId)
        .single();

    let html = "";
    data.forEach(entry => {
        html += `<a href=${entry.url}>${entry.label}</a><br>`
    });
    document.querySelector('#entries').innerHTML = html;
}

document.querySelector("#menu").addEventListener("submit", async (e) => {

    e.preventDefault();

    const nameValue = document.querySelector("#name-a").value;
    const linkValue = document.querySelector("#link-b").value;
    const webValue = document.querySelector("#web-c").value;

    const {error} = await db
        .from('dropdown_links')
        .insert([{name: nameValue,
            link: linkValue,
            web: webValue}]
        );

    if (error) {
        alert("Error: " + error.message);
        return;
    }

    document.querySelector("#name-a").value = "";
    document.querySelector("#link-b").value = "";
    document.querySelector("#web-c").value = "";


    loadEntries();

});

loadEntries();




    // 2. Define the 3 links you want to show
    const extraLinks = [
        { name: 'Visit W3Schools!', url: 'https://www.w3schools.com/' },
        { name: 'Visit Wikipedia.org!', url: 'https://wikipedia.org' },
        { name: 'Visit AnimeNewsNetwork!', url: 'https://animenewsnetwork.com' }
    ];



