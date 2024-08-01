import './Loader.scss';
import { classNames } from "../../shared/utils/classNames/classNames.ts";

interface LoaderProps {
    className?: string
}

export const Loader = ({ className }: LoaderProps) => (
  <div className={ classNames('lds-ring', {}, [ className ]) }>
      <div/>
      <div/>
      <div/>
      <div/>
  </div>
);
