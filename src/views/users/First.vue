<template>
    <Report :reportType="reportType"/>
</template>

<script>
    import Report from "@/views/users/Report";
    export default {
        name: "First",
        components:{
            Report
        },
        data(){
            return {
                reportType: "first"
            }
        }
    }
</script>

<style scoped>

</style>