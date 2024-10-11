import { useState } from 'react';
import './App.css';

export default function App() {
    const [state, setState] = useState({state : 'RGBA(255, 255, 255)'});
    const [color, setColor] = useState(false);

    // --- Конвертер цветов
    const hexToRGB = (hex, alpha) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        
        if (isNaN(r) || isNaN(g) || isNaN(b)) {
            return 'error';
        }
    
        if (alpha) {
            return `RGBA("${r}", "${g}", "${b}", "${alpha}")`;
        } else {
            return `RGBA("${r}", "${g}", "${b}")`;
        }
    }

    // --- Обработчик события инпут
    const onInput = (e) => {
        const hexCode = e.target.value;
        if (hexCode.length === 7) 
            {
                changeСaption(hexToRGB(hexCode));
                changeColor(hexCode, hexToRGB(hexCode));
            }
        else if (hexCode.length < 7)
            {
                changeСaption('RGBA(255, 255, 255)');
                changeColor('#fff');
            }
    }

    // --- Подпись в RGBA
    const changeСaption = (item) => {
        setState({ state: item === 'error' ? 'Ошибка!' : item });
    }

    // --- Смена фона
    const changeColor = (item, itemError) => {
        if (itemError === 'error') {
            setColor({ color: '#DC143C' });
        } else if (item) {
            setColor({ color: item });
        }
    }

    return (
        <div className="window" style={{ backgroundColor: color.color }} >
            <div className="window__container">
                <input className="window__input" onInput={onInput} minLength={7} maxLength={7} placeholder='Введите HEX код' />
                <span className={`window__text`}>{ state ? state.state : 'Ошибка!' }</span>
            </div>
        </div>
    );
}
