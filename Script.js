const SUPERBASE_URL = `https://infkobjgpzpmiurstpxl.supabase.co`;
const SUPERBASE_KEY = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImluZmtvYmpncHpwbWl1cnN0cHhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc2MTYxOTEsImV4cCI6MjA5MzE5MjE5MX0.tPPKIvPjV2XhgO-YMJQnFoTN2kFpRPJDRXPizSaap0o`;
const db = supabase.createClient(SUPERBASE_URL, SUPERBASE_KEY);

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

async function loadEntries() {
    // 1. Still performing the Supabase check
    const { data, error } = await db
        .from('dropdown_links')
        .select("*");

    if (error) {
        console.error("Error fetching data:", error.message);
        return;
    }

    let html = "";
    data.forEach(entry => {
        if (entry.link && entry.name) {
            html += `<a href="${escapeHtml(entry.link)}" target="_blank">${escapeHtml(entry.name)}</a><br>`;
        }
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

    e.target.reset();
    await loadEntries();
});

function escapeHtml(str) {
    if (!str) return '';
        return str.replace(/[&<>"']/g, match => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        }[match]));
    }

// 3. Automatically run loadEntries the moment the webpage loads
document.addEventListener("DOMContentLoaded", loadEntries);


