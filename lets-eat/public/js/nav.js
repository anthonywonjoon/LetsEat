function navbarCreation () {
    document.getElementById('navbar').innerHTML = `
        <div class="nav-container">
            <div class="nav-links">
                <ul>
                    <li><a href="./index.html">LET'S EAT</a></li>
                    <li style="float:right"><a href="./category.html">CATEGORIES</a></li>
                    <li style="float:right"><a href="./random.html">RANDOM</a></li>
                </ul>
            </div>
        </div>
    `
}