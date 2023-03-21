import { css } from '@emotion/css';
import customTypography from '../../cssdesigns';

const styles = {
    container: css`
        margin-top: 3rem;
    `,

    mainContainer: css`
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: ${customTypography.smallSpacing};
        overflow: auto;
        scroll-behavior: smooth;
        //hide scrollbar
        &::-webkit-scrollbar {
            display: none;
        }
    `,
    header: css`
        margin: 1rem;
    `,
};

export default styles;
