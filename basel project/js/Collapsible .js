document.addEventListener('DOMContentLoaded', function() {
    // Get all collapsible elements
    const collapsibles = document.querySelectorAll('.souqak-collapsible');
    
    // Add click event listener to each collapsible header
    collapsibles.forEach(collapsible => {
        const header = collapsible.querySelector('.souqak-collapsible-header');
        
        header.addEventListener('click', function() {
            // Toggle active class
            collapsible.classList.toggle('active');
            
            // Close other open collapsibles (accordion style)
            collapsibles.forEach(otherCollapsible => {
                if (otherCollapsible !== collapsible && otherCollapsible.classList.contains('active')) {
                    otherCollapsible.classList.remove('active');
                }
            });
        });
    });
});