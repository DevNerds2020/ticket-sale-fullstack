import { css } from '@emotion/css';
import customTypography from '../../cssdesigns';

const styles = {
    container: css`
        margin-top: 3rem;
    `,

    filterInputs: css`
        margin-bottom: 2rem;
    `,

    mainContainer: css`
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-evenly;
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
        cursor: pointer;
        &:hover {
            transform: scale(1.3);
        }
    `,

    pageContainer: css`
        display: flex;
        flex-direction: row;
        justify-content: center;
        @media (max-width: 768px) {
            flex-direction: column;
            align-items: center;
        }
    `,

    filterContainer: css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 0.1rem;
        margin-top: 5rem;
        padding: 1rem;
        border: 1px solid ${customTypography.primaryColor};
        border-radius: 0.5rem;
        width: 60%;
        min-width: 100px;
        height: 70vh;
        position: relative;
    `,
};

export default styles;
