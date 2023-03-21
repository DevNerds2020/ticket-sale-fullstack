import { css } from '@emotion/css';
import customTypography from '../../cssdesigns';

const styles = {
    mainContainer: css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: ${customTypography.smallSpacing};
        margin: 0 2rem;
        cursor: pointer;
        @media (max-width: 768px) {
            margin: 0 1rem;
        }
    `,
    buttonsContainer: css`
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin: 0.5rem;
    `,
    submitButton: css`
        margin-right: 0.5rem !important;

        &:hover {
            background-color: ${customTypography.lightGreen} !important;
        }
    `,

    detailButton: css`
        border: none !important;
        &:hover {
            transform: scale(1.4);
        }
    `,
};

export default styles;
