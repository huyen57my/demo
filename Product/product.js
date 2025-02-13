document.addEventListener("DOMContentLoaded", function () {
    const searchBox = document.getElementById("search-box");
    const allCheckbox = document.getElementById("all");
    const nameCheckbox = document.getElementById("name");
    const brandCheckbox = document.getElementById("brand");
    const priceCheckbox = document.getElementById("price");

    const nameFilter = document.getElementById("name-filter");
    const brandFilter = document.getElementById("brand-filter");
    const minPriceFilter = document.getElementById("min-price");
    const maxPriceFilter = document.getElementById("max-price");

    let products = [];

    async function loadProducts() {
        try {
            const response = await fetch("product.json");
            products = await response.json();
            displayProducts(products); // Hiển thị tất cả sản phẩm ngay từ đầu

            searchBox.addEventListener("input", () => filterProducts());
            nameFilter.addEventListener("input", () => filterProducts());
            brandFilter.addEventListener("input", () => filterProducts());
            minPriceFilter.addEventListener("input", () => filterProducts());
            maxPriceFilter.addEventListener("input", () => filterProducts());

            allCheckbox.addEventListener("change", () => {
                if (allCheckbox.checked) {
                    nameCheckbox.checked = false;
                    brandCheckbox.checked = false;
                    priceCheckbox.checked = false;
                    toggleFilterInputs();
                    displayProducts(products); // Hiển thị lại tất cả sản phẩm ngay lập tức
                }
            });

            nameCheckbox.addEventListener("change", toggleFilterInputs);
            brandCheckbox.addEventListener("change", toggleFilterInputs);
            priceCheckbox.addEventListener("change", toggleFilterInputs);

        } catch (error) {
            console.error("Lỗi khi tải dữ liệu sản phẩm:", error);
        }
    }

    function displayProducts(productList) {
        const productContainer = document.getElementById("product-list");
        productContainer.innerHTML = "";

        if (productList.length === 0) {
            productContainer.innerHTML = "<p>Không tìm thấy sản phẩm nào.</p>";
            return;
        }

        productList.forEach(product => {
            const productCard = document.createElement("div");
            productCard.classList.add("product-card");

            productCard.innerHTML = `
                <div class="product-image">
                    <img src="${product.link}" alt="${product.name}">
                    ${product.oldprice ? '<span class="sale-badge">Sale</span>' : ""}
                </div>
                <div class="product-info">
                    <h3 class="product-name" data-id="${product.id}">${product.name}</h3>
                    <p>${product.brand}</p>
                    <div class="price-container">
                        <span class="price">${product.price}</span>
                        ${product.oldprice ? `<span class="old-price">${product.oldprice}</span>` : ""}
                    </div>
                    <p class="stock ${product.status === 'Còn hàng' ? 'in-stock' : 'out-stock'}">${product.status}</p>
                    <button class="add-to-cart">Thêm vào giỏ hàng</button>
                </div>
            `;
            productContainer.appendChild(productCard);
        });

        // Thêm sự kiện click vào tên sản phẩm
        document.querySelectorAll(".product-name").forEach(name => {
            name.addEventListener("click", function () {
                const productId = this.getAttribute("data-id");
                window.location.href = `product-detail.html?id=${productId}`;
            });
        });
    }

    function toggleFilterInputs() {
        nameFilter.style.display = nameCheckbox.checked ? "block" : "none";
        brandFilter.style.display = brandCheckbox.checked ? "block" : "none";
        minPriceFilter.style.display = priceCheckbox.checked ? "block" : "none";
        maxPriceFilter.style.display = priceCheckbox.checked ? "block" : "none";

        // Nếu có checkbox lọc được chọn, bỏ chọn "All"
        if (nameCheckbox.checked || brandCheckbox.checked || priceCheckbox.checked) {
            allCheckbox.checked = false;
        }
    }

    function filterProducts() {
        let filteredProducts = products;

        // 🆕 Lọc theo ô "Tìm kiếm sản phẩm"
        const searchKeyword = searchBox.value.trim().toLowerCase();
        if (searchKeyword !== "") {
            filteredProducts = filteredProducts.filter(product =>
                product.name.toLowerCase().includes(searchKeyword)
            );
        }

        // Lọc theo tên nếu checkbox "Tên" được chọn
        if (nameCheckbox.checked && nameFilter.value.trim() !== "") {
            const nameKeyword = nameFilter.value.trim().toLowerCase();
            filteredProducts = filteredProducts.filter(product =>
                product.name.toLowerCase().includes(nameKeyword)
            );
        }

        // Lọc theo thương hiệu nếu checkbox "Thương hiệu" được chọn
        if (brandCheckbox.checked && brandFilter.value.trim() !== "") {
            const brandKeyword = brandFilter.value.trim().toLowerCase();
            filteredProducts = filteredProducts.filter(product =>
                product.brand.toLowerCase().includes(brandKeyword)
            );
        }

        // Lọc theo khoảng giá nếu checkbox "Giá" được chọn
        if (priceCheckbox.checked) {
            const minPrice = parseFloat(minPriceFilter.value) || 0;
            const maxPrice = parseFloat(maxPriceFilter.value) || Infinity;

            filteredProducts = filteredProducts.filter(product => {
                const price = parseFloat(product.price.replace(/[^0-9]/g, ""));
                return price >= minPrice && price <= maxPrice;
            });
        }

        displayProducts(filteredProducts);
    }

    loadProducts();
});







