import { css } from '@emotion/css';
import customTypography from '../../cssdesigns';

const styles = {
    container: css`
        margin-top: 3rem;
        overflow: hidden;
        /* scroll-behavior: smooth; */
        //hide scrollbar
        /* &::-webkit-scrollbar {
            display: none;
        } */
    `,

    mainContainer: css`
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: ${customTypography.smallSpacing};
        overflow: scroll;
        scroll-behavior: smooth;
        width: 100%;
        //hide scrollbar
        &::-webkit-scrollbar {
            display: none;
        }
    `,
    header: css`
        margin: 2rem;
        cursor: pointer;
        &:hover {
            transform: scale(1.3);
        }
    `,
    tailwind: {
        //flex direction row in tailwind =>
        container: 'mt-12 overflow-hidden',

        mainContainer:
            'flex flex-row justify-center items-center overflow-y-hidden overflow-scroll scrollbar-hidden scroll-smooth w-full',
        header: 'm-8 cursor-pointer hover:scale-125',
    },
};

export default styles;
