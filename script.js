// ConnectSphere Social Media App JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Like button functionality
    const likeButtons = document.querySelectorAll('.engagement-btn');
    
    likeButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.querySelector('i').classList.contains('far')) {
                this.querySelector('i').classList.remove('far');
                this.querySelector('i').classList.add('fas');
                this.classList.add('active');
                
                // Update like count
                const postStats = this.closest('.post').querySelector('.likes');
                const currentLikes = parseInt(postStats.textContent) || 0;
                postStats.innerHTML = `<i class="fas fa-thumbs-up"></i> ${currentLikes + 1}`;
            } else {
                this.querySelector('i').classList.remove('fas');
                this.querySelector('i').classList.add('far');
                this.classList.remove('active');
                
                // Update like count
                const postStats = this.closest('.post').querySelector('.likes');
                const currentLikes = parseInt(postStats.textContent) || 1;
                postStats.innerHTML = `<i class="fas fa-thumbs-up"></i> ${Math.max(0, currentLikes - 1)}`;
            }
        });
    });
    
    // Follow button functionality
    const followButtons = document.querySelectorAll('.follow-btn');
    
    followButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.textContent === 'Add') {
                this.textContent = 'Pending';
                this.style.background = 'var(--light)';
                this.style.color = 'var(--gray)';
                this.style.borderColor = 'var(--gray)';
            } else if (this.textContent === 'Pending') {
                this.textContent = 'Add';
                this.style.background = 'transparent';
                this.style.color = 'var(--primary)';
                this.style.borderColor = 'var(--primary)';
            }
        });
    });
    
    // Post button functionality
    const postButton = document.querySelector('.post-btn');
    const postTextarea = document.querySelector('.post-input textarea');
    
    postButton.addEventListener('click', function() {
        if (postTextarea.value.trim() !== '') {
            createNewPost(postTextarea.value.trim());
            postTextarea.value = '';
        } else {
            alert('Please write something to post.');
        }
    });
    
    // Create new post function
    function createNewPost(content) {
        const feed = document.querySelector('.feed');
        const createPostElement = document.querySelector('.create-post');
        
        const newPost = document.createElement('div');
        newPost.className = 'post';
        newPost.innerHTML = `
            <div class="post-header">
                <div class="post-user">
                    <div class="avatar">JS</div>
                    <div class="post-user-info">
                        <h4>Jane Smith</h4>
                        <span>Just now · <i class="fas fa-globe-americas"></i></span>
                    </div>
                </div>
                <div class="post-options">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>
            
            <div class="post-content">
                <p>${content}</p>
            </div>
            
            <div class="post-stats">
                <div class="likes">
                    <i class="fas fa-thumbs-up"></i> 0
                </div>
                <div class="comments">
                    0 comments · 0 shares
                </div>
            </div>
            
            <div class="post-engagement">
                <div class="engagement-btn">
                    <i class="far fa-thumbs-up"></i>
                    <span>Like</span>
                </div>
                <div class="engagement-btn">
                    <i class="far fa-comment"></i>
                    <span>Comment</span>
                </div>
                <div class="engagement-btn">
                    <i class="fas fa-share"></i>
                    <span>Share</span>
                </div>
            </div>
        `;
        
        feed.insertBefore(newPost, createPostElement.nextSibling);
        
        // Add event listeners to the new post's engagement buttons
        const newLikeButtons = newPost.querySelectorAll('.engagement-btn');
        newLikeButtons.forEach(button => {
            button.addEventListener('click', function() {
                if (this.querySelector('i').classList.contains('far')) {
                    this.querySelector('i').classList.remove('far');
                    this.querySelector('i').classList.add('fas');
                    this.classList.add('active');
                    
                    // Update like count
                    const postStats = this.closest('.post').querySelector('.likes');
                    const currentLikes = parseInt(postStats.textContent) || 0;
                    postStats.innerHTML = `<i class="fas fa-thumbs-up"></i> ${currentLikes + 1}`;
                } else {
                    this.querySelector('i').classList.remove('fas');
                    this.querySelector('i').classList.add('far');
                    this.classList.remove('active');
                    
                    // Update like count
                    const postStats = this.closest('.post').querySelector('.likes');
                    const currentLikes = parseInt(postStats.textContent) || 1;
                    postStats.innerHTML = `<i class="fas fa-thumbs-up"></i> ${Math.max(0, currentLikes - 1)}`;
                }
            });
        });
        
        // Show success message
        showNotification('Your post has been published!');
    }
    
    // Story functionality
    const stories = document.querySelectorAll('.story');
    
    stories.forEach(story => {
        story.addEventListener('click', function() {
            if (this.querySelector('.story-add')) {
                showNotification('Create your story feature would open here');
            } else {
                const username = this.querySelector('.story-username').textContent;
                showNotification(`Viewing ${username}'s story`);
            }
        });
    });
    
    // Search functionality
    const searchInput = document.querySelector('.search-bar input');
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && this.value.trim() !== '') {
            showNotification(`Searching for: ${this.value}`);
            this.value = '';
        }
    });
    
    // Notification functionality
    function showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--primary);
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: var(--shadow);
            z-index: 1000;
            transform: translateX(150%);
            transition: transform 0.3s ease;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(150%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // Sidebar menu active state
    const menuItems = document.querySelectorAll('.sidebar-menu a');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            menuItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            showNotification(`Navigating to ${this.textContent}`);
        });
    });
    
    // Action icons functionality
    const actionIcons = document.querySelectorAll('.action-icon');
    
    actionIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            const action = this.querySelector('span').textContent;
            showNotification(`${action} feature would open here`);
        });
    });
});