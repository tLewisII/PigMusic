import React from 'react';
import { useSpring, animated } from 'react-spring';
import { CustomizationItem } from '../../types/game';
import './PigMascot.css';

interface PigMascotProps {
  mood: 'idle' | 'happy' | 'encouraging' | 'celebrating';
  customization?: CustomizationItem[];
}

const PigMascot: React.FC<PigMascotProps> = ({ mood, customization = [] }) => {
  const bounceAnimation = useSpring({
    from: { transform: 'scale(1) translateY(0px)' },
    to: async (next) => {
      if (mood === 'happy' || mood === 'celebrating') {
        await next({ transform: 'scale(1.1) translateY(-20px)' });
        await next({ transform: 'scale(1) translateY(0px)' });
      }
    },
    config: { tension: 300, friction: 10 }
  });

  const wiggleAnimation = useSpring({
    from: { transform: 'rotate(0deg)' },
    to: async (next) => {
      if (mood === 'idle') {
        while (true) {
          await next({ transform: 'rotate(-3deg)' });
          await next({ transform: 'rotate(3deg)' });
          await next({ transform: 'rotate(0deg)' });
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      }
    },
    config: { tension: 200, friction: 15 }
  });

  const getMoodExpression = () => {
    switch (mood) {
      case 'happy':
        return { eyes: '^^', mouth: 'D' };
      case 'encouraging':
        return { eyes: 'oo', mouth: 'o' };
      case 'celebrating':
        return { eyes: '><', mouth: 'D' };
      default:
        return { eyes: '••', mouth: 'ᵕ' };
    }
  };

  const expression = getMoodExpression();

  return (
    <animated.div 
      className={`pig-mascot ${mood}`}
      style={mood === 'idle' ? wiggleAnimation : bounceAnimation}
    >
      <div className="pig-body">
        <div className="pig-ears">
          <div className="ear left"></div>
          <div className="ear right"></div>
        </div>
        
        <div className="pig-face">
          <div className="eyes">
            <span className="eye left">{expression.eyes[0]}</span>
            <span className="eye right">{expression.eyes[1]}</span>
          </div>
          
          <div className="snout">
            <div className="nostril left"></div>
            <div className="nostril right"></div>
          </div>
          
          <div className="mouth">{expression.mouth}</div>
        </div>

        {customization.map(item => {
          if (item.type === 'hat') {
            return <div key={item.id} className={`accessory hat ${item.id}`}></div>;
          }
          return null;
        })}
      </div>

      {mood === 'celebrating' && (
        <div className="celebration-effects">
          <span className="confetti">🎉</span>
          <span className="confetti">✨</span>
          <span className="confetti">🎊</span>
        </div>
      )}
    </animated.div>
  );
};

export default PigMascot;