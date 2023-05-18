import logo from '../../assets/logo.svg';

interface LogoAttributes {
  size: number;
}

export function Logo({ size }: LogoAttributes) {
  return <img src={logo} alt="Logo" width={size} />;
}
