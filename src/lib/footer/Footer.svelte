<script>
    import Icon from '$lib/Decorations/Icon.svelte';
    import Logo from '$lib/Navigation/Logo.svelte';
    import TabDesNav from '$lib/Navigation/TabDesNav.svelte';
</script>

<footer>
    <div class="inner-container">
        <div class="top">
            <Logo type="darkOnly"/>
            <TabDesNav location="footer"/>
        </div>
        <p class="copyright">© 2021 Rafal Potasz</p>
    </div>
</footer>

<style lang="scss">
    @import '../../scss-styles/mixins';

    footer {
        grid-area: footer;
        background: v(clr-footer-bg);
        width: 100%;
        padding: 4rem;
        margin-top: 5rem;
    }
    .inner-container {
        width: 100%;
        max-width: 90rem;
        @include flex(column nowrap, start, start);
        gap: 4rem;
        margin: auto;
    }
    

    .top {
        @include flex(column nowrap, start, start);
        width: 100%;
        gap: 4rem;

        @include mq(tablet){
            @include eflex(row nowrap, space-between, center);
            gap: 0;
        }
    }

    p.copyright {
        font-family: v(fira);
        font-size: fluid(desktop, 1.4, 1.6);
        color: v(clr-text-footer-copyright);
    }
</style>