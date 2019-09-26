document.querySelectorAll('.prece').forEach(node => {
    node.textContent = new Intl.NumberFormat('uk', {
        currency: 'uk',
        style: 'currency'
    }).format(node.textContent)
});