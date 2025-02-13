// Danh sách sản phẩm mẫu để gợi ý
const productList = ["Rượu Tây Bắc", "Phụ kiện rượu", "Set quà rượu", "Đồ ngâm rượu", "Rượu gạo", "Rượu nếp", "Rượu mơ"];

// Hiển thị / Ẩn thanh tìm kiếm khi bấm icon
function toggleSearchBar() {
    let searchBox = document.querySelector(".search-container");
    searchBox.style.display = searchBox.style.display === "block" ? "none" : "block";
}

// Xử lý gợi ý khi nhập vào ô tìm kiếm
document.getElementById("search-box").addEventListener("input", function() {
    let input = this.value.toLowerCase();
    let suggestions = document.getElementById("suggestions-list");
    suggestions.innerHTML = "";  // Xóa gợi ý cũ

    if (input) {
        let filteredProducts = productList.filter(product => product.toLowerCase().includes(input));
        
        if (filteredProducts.length > 0) {
            suggestions.style.display = "block";
            filteredProducts.forEach(product => {
                let suggestionItem = document.createElement("div");
                suggestionItem.textContent = product;
                suggestionItem.onclick = function() {
                    document.getElementById("search-box").value = product;
                    suggestions.style.display = "none"; // Ẩn gợi ý sau khi chọn
                };
                suggestions.appendChild(suggestionItem);
            });
        } else {
            suggestions.style.display = "none";
        }
    } else {
        suggestions.style.display = "none";
    }
});
