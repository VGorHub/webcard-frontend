/**
 * Инициализатор данных для fallback режима
 */

// Начальные данные для опыта работы
export const initialExperiences = [
  {
    id: "1",
    period: "Июль 2024 - Сентябрь 2024",
    company: 'ООО "Газпром Трансгаз Томск"',
    position: "Backend разработчик",
    responsibilities: [
      "Разработка серверной части корпоративных приложений на Python/Django",
      "Создание и интеграция RESTful API с использованием Django REST Framework",
      "Оптимизация баз данных и повышение производительности систем",
      "Внедрение контейнеризации приложений с помощью Docker",
    ],
    technologies: ["Python", "Django", "PostgreSQL", "Docker", "REST API"],
  },
  {
    id: "2",
    period: "Февраль 2025 - Март 2025",
    company: 'ООО "Газпром Трансгаз Томск"',
    position: "Backend разработчик",
    responsibilities: [],
    description: "Планируемая стажировка",
  },
]

// Начальные данные для навыков
export const initialSkillCategories = [
  {
    id: "1",
    title: "Языки программирования",
    icon: "Code",
    skills: ["Python (Django, Django REST Framework)", "Java (Spring Boot)", "C# (ASP.NET Framework)"],
  },
  {
    id: "2",
    title: "Базы данных",
    icon: "Database",
    skills: ["PostgreSQL", "MySQL", "Redis (кэширование и оптимизация)"],
  },
  {
    id: "3",
    title: "Инструменты и технологии",
    icon: "Terminal",
    skills: [
      "Docker, Docker Compose",
      "Git (GitHub, GitLab)",
      "CI/CD (Jenkins, GitLab CI)",
      "Linux (администрирование)",
    ],
  },
  {
    id: "4",
    title: "Протоколы и стандарты",
    icon: "GitBranch",
    skills: ["RESTful API", "WebSocket"],
  },
]

// Начальные данные для образования
export const initialEducations = [
  {
    id: "1",
    institution: "Томский государственный университет систем управления и радиоэлектроники (ТУСУР)",
    degree: "Бакалавр",
    field: "Системы автоматизированного проектирования (САПР)",
    period: "2022 - 2026",
    gpa: "4.5",
    status: "in-progress" as const,
    description: "Факультет: Вычислительных систем (ФВС), Кафедра: Компьютерные системы управления и обработки (КСУП)",
    achievements: [
      '"Python разработчик" дополнительная квалификация от IT Academy',
      "Опыт написания научных статей",
      "Участие в научных конференциях",
    ],
  },
]

// Начальные данные для проектов
export const initialProjects = [
  {
    id: "1",
    title: "Система управления задачами",
    description: "Высоконагруженное приложение для распределения задач среди сотрудников с real-time уведомлениями",
    technologies: ["Python", "Django", "PostgreSQL", "Redis", "WebSocket"],
    image: "/placeholder.svg?height=300&width=400",
    githubUrl: "https://github.com/example/task-manager",
    liveUrl: "https://task-manager-demo.com",
    category: "Backend",
    fullDescription: "Комплексная система управления задачами, разработанная для крупных команд.",
    features: ["Real-time уведомления", "Система ролей", "Аналитика"],
    screenshots: ["/placeholder.svg?height=400&width=600"],
  },
]

// Начальные данные для достижений
export const initialAchievements = [
  {
    id: "1",
    title: "1 место на хакатоне IT Academy",
    description: "Разработал платформу создания клубов по интересам",
    highlight: true,
    date: "22-24 сентября 2023",
    location: "Томск, IT Academy",
    fullDescription:
      "Участвовал в хакатоне IT Academy, где за 48 часов разработал полнофункциональную платформу для создания и управления клубами по интересам. Проект включал в себя систему регистрации, создания мероприятий, чат и систему уведомлений.",
    photos: ["/placeholder.svg?height=400&width=600"],
    participants: 80,
    position: "1 место",
    organizer: "IT Academy",
  },
]

// Функция для инициализации данных в localStorage
export function initializeData() {
  if (typeof window === "undefined") return

  // Инициализируем данные только если их нет
  if (!localStorage.getItem("experiences")) {
    localStorage.setItem("experiences", JSON.stringify(initialExperiences))
  }

  if (!localStorage.getItem("skillCategories")) {
    localStorage.setItem("skillCategories", JSON.stringify(initialSkillCategories))
  }

  if (!localStorage.getItem("educations")) {
    localStorage.setItem("educations", JSON.stringify(initialEducations))
  }

  if (!localStorage.getItem("projects")) {
    localStorage.setItem("projects", JSON.stringify(initialProjects))
  }

  if (!localStorage.getItem("achievements")) {
    localStorage.setItem("achievements", JSON.stringify(initialAchievements))
  }

  if (!localStorage.getItem("contactMessages")) {
    localStorage.setItem("contactMessages", JSON.stringify([]))
  }
}
