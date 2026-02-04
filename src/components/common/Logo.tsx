import { themeColors } from '../../theme/themeConfig';

interface LogoProps {
  collapsed?: boolean;
}

const Logo = ({ collapsed = false }: LogoProps) => {
  return (
    <div
      style={{
        padding: '16px 0',
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <img
        src="/logo.png"
        alt="PrintEr Logo"
        style={{
          width: collapsed ? '40px' : '120px',
          height: 'auto',
          objectFit: 'contain',
        }}
      />
    </div>
  );
};

export default Logo;
