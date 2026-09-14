/**
 * 現代化個人網頁互動邏輯 (script.js)
 * 功能模組：主題切換、打字動效、作品篩選、彈跳視窗、導覽列高亮、表單驗證與反饋
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. 深色 / 淺色主題切換 (Theme Toggle with LocalStorage)
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlRoot = document.documentElement;

  // 取得使用者儲存的偏好，或檢測系統顏色設定
  const savedTheme = localStorage.getItem('clh-theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme) {
    htmlRoot.setAttribute('data-theme', savedTheme);
  } else if (!systemPrefersDark) {
    htmlRoot.setAttribute('data-theme', 'light');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      htmlRoot.setAttribute('data-theme', newTheme);
      localStorage.setItem('clh-theme', newTheme);
    });
  }

  // 2. 導覽列滾動陰影與捲動高亮 (Navbar Scrolled & ScrollSpy)
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // 導覽列收縮與毛玻璃加深
    if (scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // 回到頂部按鈕顯隱
    if (scrollY > 350) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }

    // 當前滾動區域的導覽列高亮 (ScrollSpy)
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 3. 行動版漢堡選單展開 / 收合
  const mobileToggleBtn = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileToggleBtn && navMenu) {
    mobileToggleBtn.addEventListener('click', () => {
      const isExpanded = mobileToggleBtn.getAttribute('aria-expanded') === 'true';
      mobileToggleBtn.setAttribute('aria-expanded', !isExpanded);
      mobileToggleBtn.classList.toggle('open');
      navMenu.classList.toggle('open');
    });

    // 點擊導覽連結時自動關閉選單
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggleBtn.classList.remove('open');
        mobileToggleBtn.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('open');
      });
    });
  }

  // 4. 打字機動態標語切換 (Typewriter Animation Effect)
  const typingElement = document.getElementById('typing-text');
  const roles = [
    '全端開發工程師 & 現代化介面架構師',
    '熱愛探索前沿技術 & 專注工程架構品質',
    '致力於打造直覺且極致的 Web 數位體驗',
    'React • Node.js • TypeScript • Cloud SaaS'
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function typeRole() {
    if (!typingElement) return;
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 45;
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 90;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typingSpeed = 2000; // 停留 2 秒
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400; // 換句間隔
    }

    setTimeout(typeRole, typingSpeed);
  }

  typeRole();

  // 5. 作品集分類切換過濾器 (Project Filtering)
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterValue === 'all' || filterValue === cardCategory) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  // 6. 專案詳情彈跳視窗 (Project Modal Data & Handlers)
  const modal = document.getElementById('project-modal');
  const modalContent = document.getElementById('modal-content');
  const modalCloseBtn = document.getElementById('modal-close');
  const openModalBtns = document.querySelectorAll('.open-modal-btn');

  const projectsData = {
    1: {
      title: 'Nebula Analytics - 雲端數據即時監控儀表板',
      category: '全端 SaaS 平台架構',
      img: 'assets/project-1.jpg',
      summary: '專為分散式架構量身打造的即時監控雲端 SaaS 平台，具備多源資料庫匯流、計算成本預測與動態互動視覺化圖表。',
      highlights: [
        '使用 WebSocket 實現低延遲數據即時更新（每秒可處理千筆指標）',
        '採用 PostgreSQL 索引調校與 Redis 快取機制，查詢響應速度提升 40%',
        '前端整合 Recharts 與客製化儀表板拖曳佈局，支援自訂數據指標看板',
        '容器化 Docker 與 GitHub Actions CI/CD 自動化部署流程'
      ],
      tech: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Redis', 'Docker', 'TailwindCSS']
    },
    2: {
      title: 'Lumina Copilot - 智慧提示詞與代碼生成工作台',
      category: 'AI 創新應用與工具開發',
      img: 'assets/project-2.jpg',
      summary: '串接 OpenAI / Anthropic 等主流大型語言模型 (LLM)，專為開發者設計的提示詞調校與代碼輔助生成工作台。',
      highlights: [
        '支援多版本提示詞 (Prompt Versioning) 比較與歷史回滾機制',
        '內建程式碼編輯器 (Monaco Editor) 與即時執行預覽沙盒環境',
        '上下文變數注入系統 (Context Variables) 簡化複合型 Prompt 測試',
        '以 FastAPI 非同步架構支撐串流回應 (Server-Sent Events, SSE)'
      ],
      tech: ['Python', 'FastAPI', 'TypeScript', 'Vue 3', 'LLM API', 'TailwindCSS']
    },
    3: {
      title: 'Core UI - 現代化無障礙前端設計系統',
      category: '前端架構與 UI/UX 設計系統',
      img: 'assets/project-3.jpg',
      summary: '遵循 WAI-ARIA 國際無障礙標準的前端元件系統，具備完整的 Design Token 變數體系、豐富微動效與深淺主題切換能力。',
      highlights: [
        '嚴格符合 WCAG 2.1 AA 無障礙標準，具備完整的鍵盤無障礙導航操作',
        '原生 CSS Variables 驅動的 Design Token 體系，支援高度客製化換膚',
        '使用 Storybook 建置獨立元件測試沙盒與完整的 API 文檔說明',
        '輕量化零多餘相依性打包，支援 NPM 模組發布與 Tree-Shaking'
      ],
      tech: ['TypeScript', 'Web Components', 'SCSS', 'Storybook', 'Vite']
    }
  };

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const projectId = btn.getAttribute('data-project');
      const project = projectsData[projectId];
      if (!project) return;

      modalContent.innerHTML = `
        <img src="${project.img}" alt="${project.title}" class="modal-img">
        <span class="badge-tag" style="margin-bottom: 8px; display: inline-block;">${project.category}</span>
        <h2 id="modal-title" style="font-size: 1.4rem; margin-bottom: 12px; color: var(--text-primary); font-weight: 700;">${project.title}</h2>
        <p style="color: var(--text-secondary); margin-bottom: 20px; line-height: 1.7; font-size: 0.96rem;">${project.summary}</p>
        
        <h4 style="font-size: 1rem; color: var(--text-primary); margin-bottom: 10px; font-weight: 600;">核心亮點與架構：</h4>
        <ul style="list-style: disc; padding-left: 20px; margin-bottom: 20px; color: var(--text-secondary); font-size: 0.92rem; line-height: 1.8;">
          ${project.highlights.map(item => `<li>${item}</li>`).join('')}
        </ul>

        <h4 style="font-size: 1rem; color: var(--text-primary); margin-bottom: 10px; font-weight: 600;">使用技術：</h4>
        <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 24px;">
          ${project.tech.map(t => `<span class="tech-chip">${t}</span>`).join('')}
        </div>

        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          <a href="#contact" class="btn btn-primary btn-sm close-modal-trigger">與我討論此專案</a>
          <a href="https://github.com/ChengLiangHsu" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">GitHub 專案庫 ↗</a>
        </div>
      `;

      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';

      // 點擊討論按鈕時關閉 modal
      const trigger = modalContent.querySelector('.close-modal-trigger');
      if (trigger) {
        trigger.addEventListener('click', closeModal);
      }
    });
  });

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });

  // 7. 一鍵複製 Email 功能
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const copyBtnText = document.getElementById('copy-btn-text');
  const emailToCopy = 'ChengLiangHsu@users.noreply.github.com';

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(emailToCopy).then(() => {
        copyBtnText.textContent = '已複製到剪貼簿！';
        showToast('Email 地址已複製到剪貼簿！');
        setTimeout(() => {
          copyBtnText.textContent = '點擊複製 Email';
        }, 2200);
      }).catch(() => {
        showToast('無法複製，請手動選取複製。');
      });
    });
  }

  // 8. 聯絡表單驗證與回饋互動
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const btnText = submitBtn ? submitBtn.querySelector('.btn-text') : null;
  const sendIcon = submitBtn ? submitBtn.querySelector('.send-icon') : null;
  const formSpinner = document.getElementById('form-spinner');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('form-name');
      const emailInput = document.getElementById('form-email');
      const messageInput = document.getElementById('form-message');

      const nameError = document.getElementById('name-error');
      const emailError = document.getElementById('email-error');
      const messageError = document.getElementById('message-error');

      let isValid = true;

      // 驗證姓名
      if (!nameInput.value.trim()) {
        nameError.style.display = 'block';
        isValid = false;
      } else {
        nameError.style.display = 'none';
      }

      // 驗證 Email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
        emailError.style.display = 'block';
        isValid = false;
      } else {
        emailError.style.display = 'none';
      }

      // 驗證訊息
      if (!messageInput.value.trim()) {
        messageError.style.display = 'block';
        isValid = false;
      } else {
        messageError.style.display = 'none';
      }

      if (!isValid) return;

      // 模擬發送流程
      submitBtn.disabled = true;
      btnText.textContent = '傳送中...';
      sendIcon.style.display = 'none';
      formSpinner.style.display = 'block';

      setTimeout(() => {
        submitBtn.disabled = false;
        btnText.textContent = '發送訊息';
        sendIcon.style.display = 'block';
        formSpinner.style.display = 'none';

        contactForm.reset();
        showToast('🎉 感謝您的留言！訊息已成功傳送，我將盡快回覆您。');
      }, 1000);
    });
  }

  // 9. Toast 提示通知函式
  const toast = document.getElementById('toast');
  const toastText = document.getElementById('toast-text');
  let toastTimer = null;

  function showToast(message) {
    if (!toast || !toastText) return;
    toastText.textContent = message;
    toast.classList.add('show');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3500);
  }
});
