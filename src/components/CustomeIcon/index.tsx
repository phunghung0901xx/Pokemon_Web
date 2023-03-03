/* Copyright (c) 2022 TORITECH */
import { FC, Fragment, memo } from 'react';
import { get, isEqual } from 'lodash';

const CustomIcons = {

};

const IconNames = [
] as const;

export type IconType = typeof IconNames[number];

type IconProps = {
  className?: string
  onClick?: () => void
  iconName: IconType
};

export const Icon: FC<IconProps> = (props) => {
  const { iconName, className, ...rest } = props;
  const IconComponent = get(CustomIcons, iconName, Fragment);

  return (
    <span {...rest}>
      <IconComponent />
    </span>
  );
};

export default memo(Icon, (prevProps, nextProps) => isEqual(prevProps, nextProps));
