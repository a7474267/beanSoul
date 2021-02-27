<template>
    <div class="bg-primary">
        <div class="container">
            <div class="row py-4 d-flex align-items-center">
                <div class="col-lg-6 d-flex justify-content-center justify-content-lg-start">
                    <p class="mb-0 text-light">Copyright © 2020
                        <span class="font-weight-bold">Bean Soul</span> All Rights Reserved.
                    </p>
                </div>
                <div class="col-lg-6 mt-3 mt-lg-0">
                    <ul class="list-unstyled mb-0 d-flex
                    justify-content-lg-end justify-content-center align-items-center">
                        <li>
                            <a href="mailto:service@beansoul.com.tw" class="text-white mr-2">
                                <i class="fas fa-envelope fa-2x"></i>
                            </a>
                        </li>
                        <li class="ml-2">
                            <a target="_blank" href="https://www.facebook.com/benson.cafe" class="text-white mr-2">
                                <i class="fab fa-facebook fa-2x"></i>
                            </a>
                        </li>
                        <li class="ml-2">
                            <router-link to="/login" class="btn text-light border-light">
                            管理員登入
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
};
</script>
