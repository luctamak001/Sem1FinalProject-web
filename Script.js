function myFunction(){

    document.getElementById("myDropdown").classList.toggle("show");
}

const btn = document.getElementById("drop-btn");
const content = document.getElementById("drop-content");

btn.addEventListener("click", () => {
    content.classList.toggle("show");
});

window.addEventListener("click", (event) => {
    if (!event.target.matches('#drop-btn')) {
        if (content.classList.contains('show')) {
            content.classList.remove('show');
        }
    }
});

window.onclick = function(event){
    if (!event.target.matches('.dropbtn')) {
        const dropdown = document.getElementsByClassName("dropdown-content");
        for (let i = 0; i < dropdown.length; i++) {
            let openDropdown = dropdowns[i];
            if (openDropdown.classList.contains("show")) {
                openDropdown.classList.remove("show");
            }

        }
    }
    
}

function toggleMenu() {
    const menu = document.querySelector('.dropdown-content');
    
    menu.classList.toggle('show');
}

document.querySelector('.dropbtn').addEventListener('click', toggleMenu);


const supabaseUrl = `https://infkobjgpzpmiurstpxl.supabase.co`;
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImluZmtvYmpncHpwbWl1cnN0cHhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc2MTYxOTEsImV4cCI6MjA5MzE5MjE5MX0.tPPKIvPjV2XhgO-YMJQnFoTN2kFpRPJDRXPizSaap0o`;
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

async function handleReadMoreClick() {
    const {data: {session}} = await supabase.auth.getSession();

    if (!session) {
        window.location.href = "login.html";
    } else {
        const dropdown = document.getElementById("myDropdown");
        dropdown.classList.toggle("show");

        if (dropdown.classList.contains("show")) {
            loadLinks();
        }
    }
}


async function loadLinks() {
    const { data: links, error } = await supabase.from('dropdown_links').select('*');
    const dropdown = document.getElementById("myDropdown");

    if (error) {
        console.error("Error loading links:", error);
        return;
    }

    if (links) {
        dropdown.innerHTML = links.map(link =>
            `<a href="${link.url}" target="_blank">${link.label}</a>`
        ).join('');
    }
}

async function handleSignUp() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const { error } = await supabase.auth.signUp({ email, password });

    if (error) alert(error.message);
    else alert('Check your email for the confirmation link!');
}

async function handleLogin() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
        document.getElementById('auth-status').innerText = error.message;
    } else {
        // If we are on login.html, send them back to services
        if (window.location.pathname.includes("login.html")) {
            window.location.href = "services.html";
        }
        document.getElementById('auth-status').innerText = `Logged in as: ${data.user.email}`;
    }
}

window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        const dropdowns = document.getElementsByClassName("dropdown-content");
        for (let i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i];
            if (openDropdown.classList.contains("show")) {
                openDropdown.classList.remove("show");
            }
        }
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    loadLinks();
});


