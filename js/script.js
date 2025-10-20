document.addEventListener('DOMContentLoaded', function() {
            const slides = document.querySelectorAll('.slide');
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');
            const currentPageEl = document.getElementById('currentPage');
            const totalPagesEl = document.getElementById('totalPages');
            const pagerDots = document.getElementById('pagerDots');
            
            let currentPage = 0;
            let slidesPerPage = getSlidesPerPage();
            let totalPages = Math.ceil(slides.length / slidesPerPage);
            
            // Функция для определения количества слайдов на странице
            function getSlidesPerPage() {
                if (window.innerWidth <= 768) return 1;
                if (window.innerWidth <= 1024) return 2;
                return 3;
            }
            
            // Функция показа активных слайдов
            function showActiveSlides() {
                // Обновляем количество слайдов на странице при ресайзе
                slidesPerPage = getSlidesPerPage();
                totalPages = Math.ceil(slides.length / slidesPerPage);
                
                // Корректируем текущую страницу если нужно
                if (currentPage >= totalPages) {
                    currentPage = totalPages - 1;
                }
                
                // Скрываем все слайды
                slides.forEach(slide => slide.classList.remove('active'));
                
                // Показываем только активные слайды для текущей страницы
                const startIndex = currentPage * slidesPerPage;
                const endIndex = startIndex + slidesPerPage;
                
                for (let i = startIndex; i < endIndex && i < slides.length; i++) {
                    slides[i].classList.add('active');
                }
                
                // Обновляем пейджер
                updatePager();
            }
            
            // Функция обновления пейджера
            function updatePager() {
                currentPageEl.textContent = currentPage + 1;
                totalPagesEl.textContent = totalPages;
                
                // Обновляем точки
                pagerDots.innerHTML = '';
                for (let i = 0; i < totalPages; i++) {
                    const dot = document.createElement('div');
                    dot.className = `dot rounded-circle ${i === currentPage ? 'bg-white' : 'bg-white bg-opacity-25'}`;
                    dot.style.width = '12px';
                    dot.style.height = '12px';
                    dot.addEventListener('click', () => {
                        currentPage = i;
                        showActiveSlides();
                    });
                    pagerDots.appendChild(dot);
                }
            }
            
            // Обработчики кнопок
            prevBtn.addEventListener('click', () => {
                currentPage = (currentPage - 1 + totalPages) % totalPages;
                showActiveSlides();
            });
            
            nextBtn.addEventListener('click', () => {
                currentPage = (currentPage + 1) % totalPages;
                showActiveSlides();
            });
            
            // Обработчик изменения размера окна
            window.addEventListener('resize', showActiveSlides);
            
            // Инициализация
            showActiveSlides();
        });
