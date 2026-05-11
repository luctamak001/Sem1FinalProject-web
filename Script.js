const supabaseUrl = `https://infkobjgpzpmiurstpxl.supabase.co`;
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImluZmtvYmpncHpwbWl1cnN0cHhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc2MTYxOTEsImV4cCI6MjA5MzE5MjE5MX0.tPPKIvPjV2XhgO-YMJQnFoTN2kFpRPJDRXPizSaap0o`;
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

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



// async function fetchUserLink(userId) {
//     // 1. Still performing the Supabase check
//     const { data, error } = await supabase
//         .from('user_links')
//         .select('url_link')
//         .eq('user_id', userId)
//         .single();
//
//     }
//
//     // 2. Define the 3 links you want to show
//     const extraLinks = [
//         { name: 'Visit W3Schools!', url: 'https://www.w3schools.com/' },
//         { name: 'Visit Wikipedia.org!', url: 'https://wikipedia.org' },
//         { name: 'Visit AnimeNewsNetwork!', url: 'https://animenewsnetwork.com' }
//     ];
//
//

