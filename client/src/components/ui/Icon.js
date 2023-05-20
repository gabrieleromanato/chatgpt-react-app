export default function Icon(props) {
    const { stroke, fill, strokeWidth, strokeLinecap, strokeLineJoin, height, width } = props;
    return (
        <svg viewBox="0 0 24 24" stroke={stroke || 'currentColor'} fill={fill || 'none'} strokeWidth={strokeWidth || '2'} strokeLinecap={strokeLinecap || 'round'}
        strokeLinejoin={strokeLineJoin || 'round'} height={height || '1em'} width={width || '1em'}>
            {props.children}
        </svg>
    )
}