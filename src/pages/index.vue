<template>
    <div class="main">
        <div class="banner">
            <van-swipe autoplay="100000">
                <van-swipe-item v-for="(item, index) in bannerList" :key="index">
                    <div class="swipe-content">
                        <img :src="item.bookPic" alt="" class="swipe-img">
                        <div class="play-btn f-box f-alc f-juc">
                            <img src="@/assets/image/home/img1.png" alt="">
                            <span>Play</span>
                        </div>
                    </div>
                </van-swipe-item>
            </van-swipe>
        </div>
        <!-- 分类 -->
        <div class="type-box">
            <!-- Most Trending 🚀 -->
            <div class="title">Most Trending</div>
            <div class="box-shadow">
                <div class="box-session f-box">
                    <div class="box-content" v-for="(item, index) in MostList" :key="index">
                        <div class="book-card f-box f-alc f-jub" v-for="(citem, cindex) in item" :key="cindex">
                            <div class="img-box">
                                <img :src="citem.bookPic" alt="">
                                <div class="rank" :class="index == 0 && 'rank' + cindex">{{ index != 0 ? index * 3 +
                                    cindex + 1 : '' }}
                                </div>
                            </div>
                            <div class="book-info">
                                <div class="name">{{ citem.bookTitle }}</div>
                                <div class="text">{{ citem.bookTheme }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Continue Watching -->
            <div v-for="(item, index) in otherList" :key="index">
                <div class="title">{{ item.bookShelfName }}</div>
                <div class="other-session f-box  f-alc">
                    <div class="other-card" v-for="(citem, cindex) in item.homeBookInfoList" :key="cindex">
                        <div class="other-img">
                            <img :src="citem.bookPic" alt="" class="pic">
                            <img src="@/assets/image/home/img6.png" alt="" class="icon">
                        </div>
                        <div class="other-text">{{ citem.bookTitle }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
defineOptions({
    name: 'home'
})
definePage({
    name: 'home',
    meta: {
        keepAlive: true,
        level: 1
    },
})
import { getHomeApi } from "@/api";
const bannerList = ref([])
const MostList = ref([])
const otherList = ref([])
onMounted(() => {
    getHome()
})
async function getHome() {
    const res = await getHomeApi()
    console.log(res)
    if (res.code == 0 && res.data.homeBookshelfInfoList) {
        res.data.homeBookshelfInfoList.forEach((item) => {
            if (item.bookshelfId == '1849005624025808896') {
                bannerList.value = item.homeBookInfoList
            }
            if (item.bookshelfId == '1849005624025808898') {
                item.homeBookInfoList.forEach((items, indexs) => {
                    let listIndex = Math.floor(indexs / 3)
                    if (!MostList.value[listIndex]) {
                        MostList.value[listIndex] = []
                    }
                    MostList.value[listIndex].push(items)
                })
            }
        })
        otherList.value = res.data.homeBookshelfInfoList.filter(item => item.bookshelfId != '1849005624025808896' && item.bookshelfId != '1849005624025808898')
    }
}
</script>
<style lang="less" scoped>
.main {
    width: 100%;
    height: calc(100vh - 50px);
    overflow-y: auto;
    background: linear-gradient(180deg, #564028 0%, #010101 100%);
    border-radius: 12px 12px 0px 0px;

    .banner {
        padding-top: 16px;
        height: 505px;
        margin-bottom: 3px;

        ::v-deep(.van-swipe) {
            height: 100%;

            .van-swipe-item {
                padding: 0 20px;
                box-sizing: border-box;
            }

            .van-swipe__indicators {
                bottom: 0px;

                .van-swipe__indicator {
                    width: 10px;
                    height: 3px;
                    border-radius: 2px;
                    background-color: rgba(#ffffff, 0.4);
                }

                .van-swipe__indicator--active {
                    width: 20px;
                    background-color: #ffffff;
                }
            }
        }

        .swipe-content {
            position: relative;
            width: 100%;
            height: 476px;

            .swipe-img {
                width: 100%;
                height: 100%;
                border-radius: 12px;
                border: 1px solid rgba(255, 255, 255, 0.5);
                box-sizing: border-box;
            }

            .play-btn {
                width: 145px;
                height: 42px;
                background: #FFFFFF;
                border-radius: 6px;
                position: absolute;
                left: 50%;
                bottom: 10px;
                transform: translateX(-50%);

                img {
                    width: 16px;
                    height: 16px;
                    margin-right: 8px;
                }

                span {
                    font-family: Arial, Arial;
                    font-weight: bold;
                    font-size: 16px;
                    color: #333333;
                }
            }
        }
    }

    .type-box {
        padding-bottom: 20px;

        .title {
            font-family: Arial, Arial;
            font-weight: bold;
            font-size: 22px;
            color: #E7E7E7;
            padding-left: 17px;
            margin-bottom: 12px;
            margin-top: 24px;
        }

        .box-shadow {
            padding-bottom: 23px;
            position: relative;
            padding-left: 15px;

            .box-session {
                width: 100%;
                overflow-x: auto;

                .box-content {
                    .book-card {
                        margin-right: 15px;
                        margin-bottom: 8px;

                        .img-box {
                            width: 75px;
                            height: 100px;
                            position: relative;

                            img {
                                width: 100%;
                                height: 100%;
                            }

                            .rank {
                                width: 26px;
                                height: 26px;
                                background: url('@/assets/image/home/img5.png') no-repeat center center / cover;
                                position: absolute;
                                left: 0;
                                bottom: 0;
                                padding: 10px 0 0 3px;
                                font-family: ArialMT;
                                font-size: 12px;
                                color: #FFFFFF;
                                box-sizing: border-box;
                            }

                            .rank0 {
                                width: 26px;
                                height: 38px;
                                background: url('@/assets/image/home/img2.png') no-repeat center center / cover;
                                padding: 0;
                            }

                            .rank1 {
                                width: 26px;
                                height: 38px;
                                background: url('@/assets/image/home/img3.png') no-repeat center center / cover;
                                padding: 0;
                            }

                            .rank2 {
                                width: 26px;
                                height: 38px;
                                background: url('@/assets/image/home/img4.png') no-repeat center center / cover;
                                padding: 0;
                            }
                        }

                        .book-info {
                            font-family: ArialMT;
                            font-size: 14px;
                            color: #FFFFFF;
                            margin-left: 10px;

                            .name {
                                width: 96px;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                -webkit-line-clamp: 2;
                                display: -webkit-box;
                                -webkit-box-orient: vertical;
                            }

                            .text {
                                font-size: 12px;
                                color: rgba(#FFFFFF, 0.46);
                                margin-top: 48px;
                                width: 96px;
                                overflow: hidden;
                                white-space: nowrap;
                                text-overflow: ellipsis;
                            }
                        }
                    }
                }
            }

            .box-session::-webkit-scrollbar {
                display: none;
            }
        }

        .box-shadow::after {
            content: "";
            width: 100%;
            height: 40px;
            background: linear-gradient(180deg, rgba(255, 66, 144, 0) 0%, rgba(255, 66, 144, 0.21) 100%);
            position: absolute;
            left: 0;
            bottom: 0;
        }

        .other-session {
            width: 100%;
            overflow-x: auto;
            padding-left: 15px;
            box-sizing: border-box;

            .other-card {
                margin-right: 8px;

                .other-img {
                    width: 102px;
                    height: 136px;
                    position: relative;
                    border-radius: 6px;
                    overflow: hidden;
                    margin-bottom: 8px;

                    .pic {
                        width: 100%;
                        height: 100%;
                    }

                    .icon {
                        width: 40px;
                        height: 40px;
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        transform: translate(-50%, -50%);
                    }
                }

                .other-text {
                    width: 96px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    -webkit-line-clamp: 2;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    font-family: ArialMT;
                    font-size: 12px;
                    color: #FFFFFF;
                    line-height: 14px;
                }
            }
        }

        .other-session::-webkit-scrollbar {
            display: none;
        }
    }
}
</style>