// تخزين التعليقات وعرضها (معدل للاقصر)
document.addEventListener("DOMContentLoaded", function() {
    loadComments();
    document.querySelectorAll(".rating input").forEach(input => {
        input.addEventListener("change", function(event) {
            let ratingValue = event.target.value;
            let placeName = "الأقصر"; // تم التعديل هنا
            if (ratingValue) {
                openCommentBox(ratingValue, document.title, placeName);
            }
        });
    });
});

// دالة فتح صندوق التعليق (بدون تعديل)
function openCommentBox(ratingValue, pageType, placeName) {
    closeCommentBox();
    
    let modal = document.createElement("div");
    modal.setAttribute("id", "commentModal");
    modal.innerHTML = `
        <div class="overlay" id="commentOverlay" onclick="closeCommentBox()"></div>
        <div class="comment-box" style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
            z-index: 1001;
            text-align: center;
            width: 300px;">
            <button onclick="closeCommentBox()" style="position: absolute; top: 10px; right: 10px; background: none; border: none; font-size: 20px; cursor: pointer;">X</button>
            <h4>كومنت</h4>
            <textarea id="commentText" placeholder="اكتب تعليقك هنا..." style="width: 100%; height: 80px; margin-bottom: 10px;"></textarea>
            <br>
            <button id="submitCommentBtn" style="background: #007bff; color: white; padding: 10px; border: none; border-radius: 5px; cursor: pointer;">إرسال</button>
        </div>
    `;
    document.body.appendChild(modal);
    
    document.getElementById("submitCommentBtn").addEventListener("click", function() {
        submitComment(ratingValue, pageType, placeName);
    });
}

// دالة إرسال التعليق (معدلة للاقصر)
function submitComment(rating, pageType, placeName) {
    let commentText = document.getElementById("commentText").value.trim();
    if (!commentText) {
        alert("يرجى إدخال تعليق قبل الإرسال.");
        return;
    }
    
    let commentData = {
        userName: "مستخدم مجهول",
        userImage: "img/user.png",
        rating: rating,
        commentText: commentText,
        location: "الأقصر", // تم التعديل هنا
        pageType: `${pageType} - ${placeName}`
    };

    let comments = JSON.parse(localStorage.getItem("comments")) || [];
    comments.push(commentData);
    localStorage.setItem("comments", JSON.stringify(comments));

    loadComments();
    closeCommentBox();
}

// دالة عرض التعليقات (معدلة للاقصر)
function loadComments() {
    let commentSection = document.getElementById("comments-list");
    if (!commentSection) return;
    commentSection.innerHTML = "";
    
    let comments = JSON.parse(localStorage.getItem("comments")) || [];
    
    // تصفية التعليقات للأقصر فقط
    let filteredComments = comments.filter(comment => 
        comment.location === "الأقصر" // تم التعديل هنا
    );

    if (filteredComments.length === 0) {
        commentSection.innerHTML += "<p class='text-center'>لا توجد تعليقات حتى الآن.</p>";
        return;
    }

    let commentsContainer = document.createElement("div");
    commentsContainer.classList.add("comments-container");
    commentsContainer.style.overflowX = "auto";
    commentsContainer.style.whiteSpace = "nowrap";

    filteredComments.forEach((commentData) => {
        let commentCard = document.createElement("div");
        commentCard.classList.add("comment-card");
        commentCard.style.display = "inline-block";
        commentCard.style.width = "300px";
        commentCard.style.margin = "10px";
        commentCard.style.verticalAlign = "top";
        commentCard.innerHTML = `
            <div class="d-flex flex-column align-items-center">
                <img src="${commentData.userImage}" alt="User Image" style="width: 50px; height: 50px; border-radius: 50%;">
                <h5 style="margin-top: 10px;">${commentData.userName}</h5>
            </div>
            <div class="rating" style="font-size: 20px; margin: 10px 0; color: gold;">${"★".repeat(commentData.rating)}${"☆".repeat(5 - commentData.rating)}</div>
            <p style="margin: 15px 0; font-size: 16px; font-weight: bold; color: #333;">${commentData.commentText}</p>
            <div class="location" style="margin-top: 10px; color: #666;">المحافظة: ${commentData.location}</div>
            <div class="page-type" style="color: #666;">التصنيف: ${commentData.pageType}</div>
        `;
        commentsContainer.appendChild(commentCard);
    });
    
    commentSection.appendChild(commentsContainer);
}

// دالة إغلاق صندوق التعليق (بدون تعديل)
function closeCommentBox() {
    document.getElementById("commentModal")?.remove();
    document.getElementById("commentOverlay")?.remove();
}
function loadComments() {
    let commentSection = document.getElementById("comments-list");
    if (!commentSection) return;
    commentSection.innerHTML = "";
    
    // جلب جميع التعليقات بدون تصفية
    let comments = JSON.parse(localStorage.getItem("comments")) || [];

    if (comments.length === 0) {
        commentSection.innerHTML += "<p class='text-center'>لا توجد تعليقات حتى الآن.</p>";
        return;
    }

    let commentsContainer = document.createElement("div");
    commentsContainer.classList.add("comments-container");
    commentsContainer.style.overflowX = "auto";
    commentsContainer.style.whiteSpace = "nowrap";

    comments.forEach((commentData) => { // عرض جميع التعليقات
        let commentCard = document.createElement("div");
        commentCard.classList.add("comment-card");
        commentCard.style.display = "inline-block";
        commentCard.style.width = "300px";
        commentCard.style.margin = "10px";
        commentCard.style.verticalAlign = "top";
        commentCard.innerHTML = `
            <div class="d-flex flex-column align-items-center">
                <img src="${commentData.userImage}" alt="User Image" style="width: 50px; height: 50px; border-radius: 50%;">
                <h5 style="margin-top: 10px;">${commentData.userName}</h5>
            </div>
            <div class="rating" style="font-size: 20px; margin: 10px 0; color: gold;">${"★".repeat(commentData.rating)}${"☆".repeat(5 - commentData.rating)}</div>
            <p style="margin: 15px 0; font-size: 16px; font-weight: bold; color: #333;">${commentData.commentText}</p>
            <div class="location" style="margin-top: 10px; color: #666;">المحافظة: ${commentData.location}</div>
            <div class="page-type" style="color: #666;">التصنيف: ${commentData.pageType}</div>
        `;
        commentsContainer.appendChild(commentCard);
    });
    
    commentSection.appendChild(commentsContainer);
}