export const categories = [
    'Frontend Develop',
    'Backend Develop',
    'Full Stack',
    'Management',
    'Deployment/Infrastructure',
    'Algorithm',
    'Marketing',
    'Artificial Intelligence'
]

export const getRandomCategory = () => categories[Math.floor(Math.random() * categories.length)]