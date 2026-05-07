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

const supabaseUrl = `https://infkobjgpzpmiurstpxl.supabase.co`;
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImluZmtvYmpncHpwbWl1cnN0cHhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc2MTYxOTEsImV4cCI6MjA5MzE5MjE5MX0.tPPKIvPjV2XhgO-YMJQnFoTN2kFpRPJDRXPizSaap0o`;
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = e.target.username.value;
    const password = e.target.password.value;

    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (authError) {
        alert('Login failed: ' + authError.message);
    } else {
        // 1. Success! Now fetch the link for this specific user
        const user = authData.user;
        fetchUserLink(user.id);
    }
});

async function fetchUserLink(userId) {
    // 2. Query your 'user_links' table for the link tied to this user ID
    const { data, error } = await supabase
        .from('user_links')
        .select('url_link')
        .eq('user_id', userId)
        .single();

    if (error) {
        console.error('Error fetching link:', error.message);
    } else if (data) {
        // 3. Display the link on your page
        const linkContainer = document.getElementById('linkDisplay');
        linkContainer.innerHTML = `<a href="${data.url_link}" target="_blank">Your Secret Link</a>`;
        linkContainer.style.display = 'block';
    }
}


