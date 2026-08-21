document.addEventListener("DOMContentLoaded", () => {

    console.log("🚀 CI/CD Deployment Dashboard loaded");

    /*
     * Simulate a live health-status check.
     * This is only a frontend demonstration.
     */

    const deploymentStatus =
        document.querySelector(".deployment-status");

    if (deploymentStatus) {

        setTimeout(() => {

            deploymentStatus.innerHTML = `
                <span class="pulse"></span>
                Pipeline deployed successfully
            `;

        }, 1000);
    }


    /*
     * Animate pipeline cards when they enter
     * the viewport.
     */

    const cards =
        document.querySelectorAll(
            ".pipeline-card, .status-card, .step, .tech-card"
        );


    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.style.opacity = "1";
                        entry.target.style.transform = "translateY(0)";

                    }

                });

            },
            {
                threshold: 0.15
            }
        );


    cards.forEach((card) => {

        card.style.opacity = "0";

        card.style.transform =
            "translateY(20px)";

        card.style.transition =
            "opacity 0.6s ease, transform 0.6s ease";

        observer.observe(card);

    });


    /*
     * Display current deployment time.
     */

    const deploymentTime =
        document.querySelector(".deployment-time");


    if (deploymentTime) {

        const now = new Date();

        const formattedTime =
            now.toLocaleString();

        deploymentTime.textContent =
            `🚀 Dashboard loaded: ${formattedTime}`;

    }

});
