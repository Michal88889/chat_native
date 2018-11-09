import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from "@angular/core";
import { RadSideDrawerComponent, SideDrawerType } from "nativescript-ui-sidedrawer/angular";
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { Page } from 'tns-core-modules/ui/page/page';
import { isAndroid } from "tns-core-modules/platform";

@Component({
    selector: "Chat",
    moduleId: module.id,
    template: `
    <ActionBar title=""></ActionBar>
    <gridLayout rows="50, *" columns="50, *">
        <button text="&#xe9bd;" class="iconBtn menuBtn" *ngIf="isMenuBtnVisible" row="0" col="0" (tap)="showMenu($event)"></button>
        <RadSideDrawer row="0" col="0" rowSpan="2" colSpan="2" (drawerOpening)="onDrawerOpening($event)" (drawerClosing)="onDrawerClosing($event)">
            <StackLayout tkDrawerContent class="sideStackLayout">
                <chat-navbar tkDrawerContent></chat-navbar>
            </StackLayout>
            <StackLayout tkMainContent>
                    <router-outlet></router-outlet>
            </StackLayout>
        </RadSideDrawer>
    </gridLayout>
    `,
})
export class ChatComponent implements OnInit, AfterViewInit {
    /**
     * Asta 09.11.2018:
     * 1. _changeDetectionRef => changeDetectionRef (camelCase wszędzie, to wszędzie)
     * 2. Konstruktory komponentów powinny zawierać tylko wstrzykiwane klasy i być puste
     *    ngOnInit powinno zawierać operacje na start komponentu
     */
    @ViewChild(RadSideDrawerComponent) public drawerComponent: RadSideDrawerComponent;
    private drawer: RadSideDrawer;

    private isMenuBtnVisible: boolean = true;

    constructor(private changeDetectionRef: ChangeDetectorRef, private page: Page) { }

    ngAfterViewInit() {
        this.drawer = this.drawerComponent.sideDrawer;
        this.changeDetectionRef.detectChanges();
    }

    ngOnInit() {
        if (isAndroid) {
            this.page.actionBarHidden = true;
        }
    }

    onDrawerOpening(args?) {
        this.isMenuBtnVisible = false;
    }

    onDrawerClosing(args?) {
        this.isMenuBtnVisible = true;
    }

    showMenu(args?) {
        this.drawer.showDrawer();
    }

}
