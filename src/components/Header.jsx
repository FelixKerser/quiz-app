import logoImg from '../assets/quiz-logo.png'

export default function Header() {
    return (
        <header>
            <img src={logoImg} alt="logo" />
            <h1>Quiz app by Kyrylo</h1>
        </header>
    )
}